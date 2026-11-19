import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { NAV_ITEMS } from '../../data/nav-data';
import { Intro } from '../../shared/intro/intro';
import { LanguageSwitch } from '../../shared/language-switch/language-switch';
import { Menu } from '../menu/menu';

const BURGER_BREAKPOINT = 1024;
const SCROLL_TOP_LIMIT = 10;
const SCROLL_STEP_MIN = 5;
const PROJECT_PATH = '/project/';

@Component({
  imports: [RouterLink, TranslatePipe, LanguageSwitch, Menu],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  host: {
    '(window:scroll)': 'handleScroll()',
    '(window:resize)': 'closeMenuOnWideScreen()',
    '[class.header-hidden]': 'isHeaderHidden()',
    '[class.header-solid]': 'hasHeaderBackground() || isProjectPage()',
    '[class.header-intro-hidden]': 'isIntroPending()',
    '[class.header-intro-skipped]': "introPhase() === 'skipped'",
  },
})
export class Header {
  protected readonly isHeaderHidden = signal(false);
  protected readonly hasHeaderBackground = signal(false);
  private readonly router = inject(Router);
  protected readonly introPhase = inject(Intro).phase;
  protected readonly navItems = NAV_ITEMS;
  protected readonly isMenuOpen = signal(false);
  private readonly menuToggle = viewChild.required<ElementRef<HTMLButtonElement>>('menuToggle');
  protected readonly isIntroPending = computed(() => this.introPhase() === 'letters' || this.introPhase() === 'photo');
  protected readonly isProjectPage = toSignal(
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

  protected openMenu(): void {
    this.isMenuOpen.set(true);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.menuToggle().nativeElement.focus({ preventScroll: true });
  }

  protected closeMenuOnWideScreen(): void {
    if (this.isMenuOpen() && window.innerWidth >= BURGER_BREAKPOINT) this.isMenuOpen.set(false);
  }

  protected handleScroll(): void {
    const CURRENT_SCROLL = window.scrollY;
    const IS_AT_TOP = CURRENT_SCROLL <= SCROLL_TOP_LIMIT;
    if (Math.abs(CURRENT_SCROLL - this.lastScrollY) >= SCROLL_STEP_MIN) {
      this.isHeaderHidden.set(!IS_AT_TOP && CURRENT_SCROLL > this.lastScrollY);
      this.lastScrollY = CURRENT_SCROLL;
    }
    this.hasHeaderBackground.set(!IS_AT_TOP);
  }
}