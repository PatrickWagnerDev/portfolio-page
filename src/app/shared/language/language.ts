import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SUPPORTED_LANGUAGES = ['en', 'de'];
const DEFAULT_LANGUAGE = 'en';
const GERMAN_LANGUAGE = 'de';

@Injectable({ providedIn: 'root' })
export class Language {
  private readonly translate = inject(TranslateService);
  readonly isGerman = signal(false);

  constructor() {
    this.setLanguage(this.detectLanguage());
  }

  toggleLanguage(): void {
    this.setLanguage(this.isGerman() ? DEFAULT_LANGUAGE : GERMAN_LANGUAGE);
  }

  private detectLanguage(): string {
    const BROWSER_LANGUAGE = navigator.language.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(BROWSER_LANGUAGE) ? BROWSER_LANGUAGE : DEFAULT_LANGUAGE;
  }

  private setLanguage(language: string): void {
    this.isGerman.set(language === GERMAN_LANGUAGE);
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
