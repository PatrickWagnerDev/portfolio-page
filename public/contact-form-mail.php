<?php

header("Access-Control-Allow-Origin: https://patrickwagnerdev.de");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$siteEmail = "kontakt@patrickwagnerdev.de";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_SECONDS = 60;

function sendJson(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function sendError(int $status, string $error): void
{
    sendJson($status, ['success' => false, 'error' => $error]);
}

function readParams(): object
{
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
        sendError(415, 'Unsupported content type');
    }
    $params = json_decode(file_get_contents('php://input'));
    if (json_last_error() !== JSON_ERROR_NONE || !is_object($params)) {
        sendError(400, 'Invalid JSON');
    }
    return $params;
}

function readField(object $params, string $key): string
{
    $value = $params->$key ?? '';
    return is_string($value) ? trim($value) : '';
}

function isInputInvalid(array $input): bool
{
    return $input['name'] === ''
        || $input['message'] === ''
        || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)
        || mb_strlen($input['name']) > MAX_NAME_LENGTH
        || mb_strlen($input['email']) > MAX_EMAIL_LENGTH
        || mb_strlen($input['message']) > MAX_MESSAGE_LENGTH;
}

function readInput(object $params): array
{
    $input = [
        'name' => readField($params, 'name'),
        'email' => readField($params, 'email'),
        'message' => readField($params, 'message'),
    ];
    if (isInputInvalid($input)) {
        sendError(400, 'Invalid input data');
    }
    return $input;
}

function isRateLimited(): bool
{
    $file = sys_get_temp_dir() . '/contact_' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');
    $isLimited = file_exists($file) && time() - filemtime($file) < RATE_LIMIT_SECONDS;
    if (!$isLimited) {
        touch($file);
    }
    return $isLimited;
}

function buildMailBody(array $input): string
{
    $safeName = htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($input['email'], ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8'));
    return "
        <strong>Name:</strong> {$safeName}<br>
        <strong>Email:</strong> {$safeEmail}<br><br>
        <strong>Message:</strong><br>
        {$safeMessage}
    ";
}

function sendMail(string $siteEmail, string $email, string $body): bool
{
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: Website Kontakt <' . $siteEmail . '>',
        'Reply-To: ' . $email,
        'Return-Path: ' . $siteEmail,
    ];
    return mail($siteEmail, 'Website Contact Form', $body, implode("\r\n", $headers), '-f ' . $siteEmail);
}

function handlePost(string $siteEmail): void
{
    $params = readParams();
    if (!empty($params->website)) {
        sendJson(200, ['success' => true]);
    }
    $input = readInput($params);
    if (isRateLimited()) {
        sendError(429, 'Too many requests');
    }
    $body = buildMailBody($input);
    $isSent = sendMail($siteEmail, $input['email'], $body);
    $isSent ? sendJson(200, ['success' => true]) : sendError(500, 'Mail delivery failed');
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        http_response_code(200);
        exit;
    case 'POST':
        handlePost($siteEmail);
        break;
    default:
        sendError(405, 'Method not allowed');
}