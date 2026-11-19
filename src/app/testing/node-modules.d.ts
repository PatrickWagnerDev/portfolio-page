declare module 'node:fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string;
  export function readdirSync(path: string, options: { withFileTypes: true }): { name: string; isDirectory(): boolean }[];
}

declare module 'node:path' {
  export function join(...parts: string[]): string;
}

declare const process: { cwd(): string };
