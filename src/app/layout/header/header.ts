import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

const SCROLL_TOP_LIMIT = 10;
const SCROLL_STEP_MIN = 5;
const PROJECT_PATH = '/project/';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  host: {
    '(window:scroll)': 'handleScroll()',
    '[class.header-hidden]': 'isHeaderHidden()',
    '[class.header-solid]': 'hasHeaderBackground() || isProjectPage()',
  },
})
export class Header {
  readonly isHeaderHidden = signal(false);
  readonly hasHeaderBackground = signal(false);
  private readonly router = inject(Router);
  readonly isProjectPage = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.startsWith(PROJECT_PATH)),
    ),
    { initialValue: false },
  );
  private lastScrollY = 0;

  constructor() {
    this.handleScroll();
  }

  handleScroll(): void {
    const CURRENT_SCROLL = window.scrollY;
    const IS_AT_TOP = CURRENT_SCROLL <= SCROLL_TOP_LIMIT;
    if (Math.abs(CURRENT_SCROLL - this.lastScrollY) >= SCROLL_STEP_MIN) {
      this.isHeaderHidden.set(!IS_AT_TOP && CURRENT_SCROLL > this.lastScrollY);
      this.lastScrollY = CURRENT_SCROLL;
    }
    this.hasHeaderBackground.set(!IS_AT_TOP);
  }
}