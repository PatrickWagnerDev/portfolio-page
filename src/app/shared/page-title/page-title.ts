import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/** Translation key of the title used when a route has none. */
const DEFAULT_KEY = 'titles.home';
/** Translation key of the meta description. */
const DESCRIPTION_KEY = 'meta.description';

/**
 * Sets the page title and the meta description from the translations and updates them when the language changes.
 */
@Injectable({ providedIn: 'root' })
export class PageTitle extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);
  /** Translation key of the title of the current route. */
  private currentKey = DEFAULT_KEY;

  /** Refreshes title and description after the translations change. */
  constructor() {
    super();
    this.translate.onTranslationRefresh.subscribe(() => this.applyTitle());
  }

  /**
   * Called by the router after each navigation.
   * @param snapshot - Router state of the finished navigation.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.currentKey = this.buildTitle(snapshot) ?? DEFAULT_KEY;
    this.applyTitle();
  }

  /** Writes the translated title of the current route into the document. */
  private applyTitle(): void {
    const TITLE_TEXT = this.translate.instant(this.currentKey);
    if (TITLE_TEXT !== this.currentKey) this.title.setTitle(TITLE_TEXT);
    this.applyDescription();
  }

  /** Writes the translated meta description into the document. */
  private applyDescription(): void {
    const DESCRIPTION_TEXT = this.translate.instant(DESCRIPTION_KEY);
    if (DESCRIPTION_TEXT !== DESCRIPTION_KEY) this.meta.updateTag({ name: 'description', content: DESCRIPTION_TEXT });
  }
}
