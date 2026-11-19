import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_KEY = 'titles.home';
const DESCRIPTION_KEY = 'meta.description';

@Injectable({ providedIn: 'root' })
export class PageTitle extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);
  private currentKey = DEFAULT_KEY;

  constructor() {
    super();
    this.translate.onTranslationRefresh.subscribe(() => this.applyTitle());
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.currentKey = this.buildTitle(snapshot) ?? DEFAULT_KEY;
    this.applyTitle();
  }

  private applyTitle(): void {
    const TITLE_TEXT = this.translate.instant(this.currentKey);
    if (TITLE_TEXT !== this.currentKey) this.title.setTitle(TITLE_TEXT);
    this.applyDescription();
  }

  private applyDescription(): void {
    const DESCRIPTION_TEXT = this.translate.instant(DESCRIPTION_KEY);
    if (DESCRIPTION_TEXT !== DESCRIPTION_KEY) this.meta.updateTag({ name: 'description', content: DESCRIPTION_TEXT });
  }
}
