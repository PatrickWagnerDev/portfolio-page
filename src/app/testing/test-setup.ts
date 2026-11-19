import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

export const TEST_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideRouter([]),
  provideHttpClient(),
  provideHttpClientTesting(),
  provideTranslateService({ lang: 'en', fallbackLang: 'en' }),
];

class ObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

export function stubBrowserApis(prefersReducedMotion = false): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({ matches: prefersReducedMotion, media: query }),
  });
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: ObserverStub });
}
