import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { NAV_ITEMS } from '../../data/nav-data';
import { Intro } from '../../shared/intro/intro';
import { LanguageSwitch } from '../../shared/language-switch/language-switch';
import { Menu } from '../menu/menu';

/** Viewport width in pixels from which the burger menu is replaced by the navigation bar. */
const BURGER_BREAKPOINT = 1024;
/** Scroll position in pixels up to which the page counts as being at the top. */
const SCROLL_TOP_LIMIT = 10;
/** Smallest scroll movement in pixels that changes the hide or show state of the header. */
const SCROLL_STEP_MIN = 5;
/** Path prefix of the project detail pages. */
const PROJECT_PATH = '/project/';

/**
 * Fixed site header with navigation, language switch and burger menu. Hides while scrolling down and shows while scrolling up.
 */
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
  /** True while the header is slid out of view. */
  protected readonly isHeaderHidden = signal(false);
  /** True once the page is scrolled away from the top. */
  protected readonly hasHeaderBackground = signal(false);
  private readonly router = inject(Router);
  /** Current phase of the hero intro animation. */
  protected readonly introPhase = inject(Intro).phase;
  /** Entries of the main navigation. */
  protected readonly navItems = NAV_ITEMS;
  /** True while the burger menu is open. */
  protected readonly isMenuOpen = signal(false);
  /** Burger button, receives the focus again when the menu closes. */
  private readonly menuToggle = viewChild.required<ElementRef<HTMLButtonElement>>('menuToggle');
  /** True while the intro still plays, the header stays hidden then. */
  protected readonly isIntroPending = computed(() => this.introPhase() === 'letters' || this.introPhase() === 'photo');
  /** True on project detail pages, where the header always has a background. */
  protected readonly isProjectPage = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.startsWith(PROJECT_PATH)),
    ),
    { initialValue: false },
  );
  /** Scroll position at the last accepted scroll step. */
  private lastScrollY = 0;

  /** Reads the initial scroll position. */
  constructor() {
    this.handleScroll();
  }

  /** Opens the burger menu. */
  protected openMenu(): void {
    this.isMenuOpen.set(true);
  }

  /** Closes the burger menu and moves the focus back to the burger button. */
  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.menuToggle().nativeElement.focus({ preventScroll: true });
  }

  /** Closes the burger menu when the window grows to a width where the navigation bar is shown. */
  protected closeMenuOnWideScreen(): void {
    if (this.isMenuOpen() && window.innerWidth >= BURGER_BREAKPOINT) this.isMenuOpen.set(false);
  }

  /** Hides the header while scrolling down, shows it while scrolling up and sets the background state. */
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