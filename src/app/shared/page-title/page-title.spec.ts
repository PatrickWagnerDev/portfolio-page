import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, TitleStrategy, provideRouter } from '@angular/router';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { readTexts } from '../../testing/translation-files';
import { PageTitle } from './page-title';

@Component({ template: '' })
class DummyPage {}

describe('PageTitle', () => {
  let router: Router;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: DummyPage, title: 'titles.home' },
          { path: 'legal-notice', component: DummyPage, title: 'titles.legalNotice' },
          { path: 'without-title', component: DummyPage },
        ]),
        provideTranslateService({ lang: 'en', fallbackLang: 'en' }),
        { provide: TitleStrategy, useExisting: PageTitle },
      ],
    });
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', readTexts('en'));
    translate.setTranslation('de', readTexts('de'));
    router = TestBed.inject(Router);
  });

  it('should set the english title of the route', async () => {
    await router.navigateByUrl('/legal-notice');
    expect(document.title).toBe('Legal Notice – Patrick Wagner');
  });

  it('should change the title when the language changes', async () => {
    await router.navigateByUrl('/legal-notice');
    await firstValueFrom(translate.use('de'));
    expect(document.title).toBe('Impressum – Patrick Wagner');
  });

  it('should fall back to the home title for a route without a title', async () => {
    await router.navigateByUrl('/without-title');
    expect(document.title).toBe('Patrick Wagner – Frontend Developer');
  });
});
