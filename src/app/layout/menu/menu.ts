import { Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { getSocialLinks } from '../../data/contact-data';
import { NAV_ITEMS } from '../../data/nav-data';
import { LanguageSwitch } from '../../shared/language-switch/language-switch';

/** Minimum swipe distance in pixels before a swipe up closes the menu. */
const SWIPE_MIN_DISTANCE = 96;
/** Share of the panel height (0 to 1) that a swipe up must cover to close the menu. */
const SWIPE_HEIGHT_RATIO = 0.25;

/**
 * Full screen menu panel on phones and dropdown panel on tablets. Closes by button, escape key, click outside, link click or swipe up.
 */
@Component({
  imports: [RouterLink, TranslatePipe, LanguageSwitch],
  selector: 'app-menu',
  styleUrl: './menu.scss',
  templateUrl: './menu.html',
  host: {
    '[class.menu-open]': 'isOpen()',
    '[class.menu-dragging]': 'swipeOffset() > 0',
    '(document:keydown.escape)': 'closeMenu()',
    '(click)': 'closeOnOutsideClick($event)',
  },
})
export class Menu {
  /** Whether the menu is open. */
  readonly isOpen = input.required<boolean>();
  /** Emits when the menu asks to be closed. */
  readonly closed = output<void>();
  /** Entries of the main navigation. */
  protected readonly navItems = NAV_ITEMS;
  /** Social links shown below the language switch. */
  protected readonly socialLinks = getSocialLinks(['github', 'linkedin', 'mail']);
  /** Distance in pixels the panel follows the finger while swiping up. */
  protected readonly swipeOffset = signal(0);
  /** Scrollable menu panel. */
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  /** Close button, receives the focus when the menu opens. */
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');
  /** Vertical touch position where the current swipe started. */
  private swipeStartY = 0;

  /** Locks the page scroll and moves the focus to the close button while the menu is open. */
  constructor() {
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
      if (this.isOpen()) setTimeout(() => this.closeButton().nativeElement.focus({ preventScroll: true }));
    });
  }

  /** Asks the parent to close the menu if it is open. */
  protected closeMenu(): void {
    if (this.isOpen()) this.closed.emit();
  }

  /**
   * Closes the menu when the click hits the backdrop instead of the panel.
   * @param event - Click event of the menu host.
   */
  protected closeOnOutsideClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeMenu();
  }

  /**
   * Remembers where a swipe starts.
   * @param event - Touch event of the panel.
   */
  protected startSwipe(event: TouchEvent): void {
    this.swipeStartY = event.touches[0].clientY;
  }

  /**
   * Lets the panel follow an upward swipe, but only when the panel is scrolled to its end.
   * @param event - Touch event of the panel.
   */
  protected moveSwipe(event: TouchEvent): void {
    const PANEL_ELEMENT = this.panel().nativeElement;
    const IS_AT_END = PANEL_ELEMENT.scrollTop + PANEL_ELEMENT.clientHeight >= PANEL_ELEMENT.scrollHeight - 1;
    const SWIPE_DISTANCE = this.swipeStartY - event.touches[0].clientY;
    this.swipeOffset.set(IS_AT_END ? Math.max(0, SWIPE_DISTANCE) : 0);
  }

  /** Closes the menu when the swipe was long enough, otherwise lets the panel spring back. */
  protected endSwipe(): void {
    const CLOSE_LIMIT = Math.max(SWIPE_MIN_DISTANCE, this.panel().nativeElement.offsetHeight * SWIPE_HEIGHT_RATIO);
    const SHOULD_CLOSE = this.swipeOffset() >= CLOSE_LIMIT;
    this.swipeOffset.set(0);
    if (SHOULD_CLOSE) this.closeMenu();
  }
}
