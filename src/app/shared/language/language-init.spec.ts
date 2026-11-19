import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { TEST_PROVIDERS } from '../../testing/test-setup';
import { Language } from './language';
import { waitForTranslations } from './language-init';

describe('waitForTranslations', () => {
  afterEach(() => vi.restoreAllMocks());

  function prepare(browserLanguage: string): void {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(browserLanguage);
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
  }

  it('should report the current language of the service', () => {
    prepare('de-DE');
    expect(TestBed.inject(Language).currentLanguage()).toBe('de');
  });

  it('should finish after the translations of the browser language were requested', async () => {
    prepare('de-DE');
    const USE_SPY = vi.spyOn(TestBed.inject(TranslateService), 'use');
    await TestBed.runInInjectionContext(() => waitForTranslations());
    expect(USE_SPY).toHaveBeenCalledWith('de');
  });

  it('should finish even when the translations cannot be loaded', async () => {
    prepare('en-US');
    vi.spyOn(TestBed.inject(TranslateService), 'use').mockReturnValue(throwError(() => new Error('failed')));
    await expect(TestBed.runInInjectionContext(() => waitForTranslations())).resolves.toBeNull();
  });
});
