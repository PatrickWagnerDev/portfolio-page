import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Texts {
  [key: string]: string | Texts;
}

export function readTexts(language: string): Texts {
  return JSON.parse(readFileSync(join(process.cwd(), 'public', 'i18n', language + '.json'), 'utf8'));
}

export function flattenTexts(texts: Texts, prefix = ''): { key: string; text: string }[] {
  return Object.entries(texts).flatMap(([key, value]) => {
    const FULL_KEY = prefix ? prefix + '.' + key : key;
    return typeof value === 'string' ? [{ key: FULL_KEY, text: value }] : flattenTexts(value, FULL_KEY);
  });
}

export function hasTextKey(texts: Texts, key: string): boolean {
  const FOUND_TEXT = key.split('.').reduce<unknown>((node, part) => {
    return typeof node === 'object' && node !== null ? (node as Texts)[part] : undefined;
  }, texts);
  return typeof FOUND_TEXT === 'string';
}

export function readSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const FULL_PATH = join(directory, entry.name);
    if (entry.isDirectory()) return readSourceFiles(FULL_PATH);
    const IS_SOURCE = /\.(html|ts)$/.test(entry.name) && !entry.name.endsWith('.spec.ts');
    return IS_SOURCE ? [readFileSync(FULL_PATH, 'utf8')] : [];
  });
}
