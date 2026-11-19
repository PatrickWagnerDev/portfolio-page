import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { Language } from './language';

export function waitForTranslations(): Promise<unknown> {
  const TRANSLATE = inject(TranslateService);
  const LANGUAGE = inject(Language);
  return firstValueFrom(TRANSLATE.use(LANGUAGE.currentLanguage()).pipe(catchError(() => of(null))));
}
