import { join } from 'node:path';
import { routes } from './app.routes';
import { PROJECT_INFOS } from './data/project-data';
import { flattenTexts, hasTextKey, readSourceFiles, readTexts } from './testing/translation-files';

const NOTICE_KEY = 'privacy.notice';
const english = readTexts('en');
const german = readTexts('de');

function findUsedKeys(): string[] {
  const source = readSourceFiles(join(process.cwd(), 'src', 'app')).join('\n');
  const patterns = [/'([a-zA-Z]+(?:\.[a-zA-Z0-9-]+)+)'\s*\|\s*translate/g, /(?:labelKey|title): '([a-zA-Z]+\.[a-zA-Z0-9-]+)'/g];
  const keys = patterns.flatMap((pattern) => Array.from(source.matchAll(pattern), (match) => match[1]));
  return Array.from(new Set(keys));
}

describe('translation files', () => {
  it('should have a german text for every english key except the translation notice', () => {
    const missing = flattenTexts(english).filter(({ key }) => key !== NOTICE_KEY && !hasTextKey(german, key));
    expect(missing.map(({ key }) => key)).toEqual([]);
  });

  it('should not have german keys without an english text', () => {
    const extra = flattenTexts(german).filter(({ key }) => !hasTextKey(english, key));
    expect(extra.map(({ key }) => key)).toEqual([]);
  });

  it('should not contain empty texts', () => {
    const empty = [...flattenTexts(english), ...flattenTexts(german)].filter(({ text }) => text.trim() === '');
    expect(empty.map(({ key }) => key)).toEqual([]);
  });

  it('should contain every key that the templates and the data files use', () => {
    const keys = findUsedKeys();
    expect(keys.length).toBeGreaterThan(50);
    const missingEnglish = keys.filter((key) => !hasTextKey(english, key));
    const missingGerman = keys.filter((key) => key !== NOTICE_KEY && !hasTextKey(german, key));
    expect([...missingEnglish, ...missingGerman]).toEqual([]);
  });

  it('should contain the project texts for every project in both languages', () => {
    const keys = PROJECT_INFOS.flatMap((project) =>
      ['description', 'details', 'duration'].map((field) => 'projectData.' + project.id + '.' + field),
    );
    expect(keys.filter((key) => !hasTextKey(english, key) || !hasTextKey(german, key))).toEqual([]);
  });

  it('should have a translated title for every route that has one', () => {
    const titles = routes.map((route) => route.title).filter((title): title is string => typeof title === 'string');
    expect(titles.length).toBe(4);
    expect(titles.filter((title) => !hasTextKey(english, title) || !hasTextKey(german, title))).toEqual([]);
  });
});
