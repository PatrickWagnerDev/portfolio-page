import { TestBed } from '@angular/core/testing';
import { TEST_PROVIDERS } from '../../testing/test-setup';
import { Language } from './language';

describe('Language', () => {
  afterEach(() => vi.restoreAllMocks());

  function createService(browserLanguage: string): Language {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(browserLanguage);
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
    return TestBed.inject(Language);
  }

  it('should start in german for a german browser', () => {
    expect(createService('de-DE').isGerman()).toBe(true);
    expect(document.documentElement.lang).toBe('de');
  });

  it('should fall back to english for other languages', () => {
    expect(createService('fr-FR').isGerman()).toBe(false);
    expect(document.documentElement.lang).toBe('en');
  });

  it('should toggle between the languages', () => {
    const language = createService('en-US');
    language.toggleLanguage();
    expect(language.isGerman()).toBe(true);
    language.toggleLanguage();
    expect(language.isGerman()).toBe(false);
  });
});
