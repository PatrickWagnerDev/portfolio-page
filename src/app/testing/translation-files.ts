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
    const fullKey = prefix ? prefix + '.' + key : key;
    return typeof value === 'string' ? [{ key: fullKey, text: value }] : flattenTexts(value, fullKey);
  });
}

export function hasTextKey(texts: Texts, key: string): boolean {
  const found = key.split('.').reduce<unknown>((node, part) => {
    return typeof node === 'object' && node !== null ? (node as Texts)[part] : undefined;
  }, texts);
  return typeof found === 'string';
}

export function readSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return readSourceFiles(fullPath);
    const isSource = /\.(html|ts)$/.test(entry.name) && !entry.name.endsWith('.spec.ts');
    return isSource ? [readFileSync(fullPath, 'utf8')] : [];
  });
}
