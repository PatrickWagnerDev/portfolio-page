import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { Language } from './language';

/**
 * Waits until the translations of the active language are loaded, so the first render already shows real texts.
 * Must run in an injection context, for example as app initializer.
 * @returns A promise that resolves when the translations are loaded or loading failed.
 */
export function waitForTranslations(): Promise<unknown> {
  const TRANSLATE = inject(TranslateService);
  const LANGUAGE = inject(Language);
  return firstValueFrom(TRANSLATE.use(LANGUAGE.currentLanguage()).pipe(catchError(() => of(null))));
}
