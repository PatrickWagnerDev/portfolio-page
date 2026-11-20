import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/** Language codes the site is translated into. */
const SUPPORTED_LANGUAGES = ['en', 'de'];
/** Language used when the browser language is not supported. */
const DEFAULT_LANGUAGE = 'en';
/** Language code of the German translation. */
const GERMAN_LANGUAGE = 'de';

/**
 * Detects the browser language, switches between German and English and keeps the html lang attribute in sync.
 */
@Injectable({ providedIn: 'root' })
export class Language {
  private readonly translate = inject(TranslateService);
  /** True while the site is shown in German. */
  readonly isGerman = signal(false);

  /** Starts with the detected browser language. */
  constructor() {
    this.setLanguage(this.detectLanguage());
  }

  /**
   * Tells the active language.
   * @returns The code de or en.
   */
  currentLanguage(): string {
    return this.isGerman() ? GERMAN_LANGUAGE : DEFAULT_LANGUAGE;
  }

  /** Switches between German and English. */
  toggleLanguage(): void {
    this.setLanguage(this.isGerman() ? DEFAULT_LANGUAGE : GERMAN_LANGUAGE);
  }

  /**
   * Reads the browser language.
   * @returns The browser language if supported, otherwise the default language.
   */
  private detectLanguage(): string {
    const BROWSER_LANGUAGE = navigator.language.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(BROWSER_LANGUAGE) ? BROWSER_LANGUAGE : DEFAULT_LANGUAGE;
  }

  /**
   * Activates a language for the translations and the html lang attribute.
   * @param language - Language code to activate.
   */
  private setLanguage(language: string): void {
    this.isGerman.set(language === GERMAN_LANGUAGE);
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
