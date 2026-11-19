import { Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { getSocialLinks } from '../../data/contact-data';
import { NAV_ITEMS } from '../../data/nav-data';
import { LanguageSwitch } from '../../shared/language-switch/language-switch';

const SWIPE_MIN_DISTANCE = 96;
const SWIPE_HEIGHT_RATIO = 0.25;

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
  readonly isOpen = input.required<boolean>();
  readonly closed = output<void>();
  protected readonly navItems = NAV_ITEMS;
  protected readonly socialLinks = getSocialLinks(['github', 'linkedin', 'mail']);
  protected readonly swipeOffset = signal(0);
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');
  private swipeStartY = 0;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
      if (this.isOpen()) setTimeout(() => this.closeButton().nativeElement.focus({ preventScroll: true }));
    });
  }

  protected closeMenu(): void {
    if (this.isOpen()) this.closed.emit();
  }

  protected closeOnOutsideClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeMenu();
  }

  protected startSwipe(event: TouchEvent): void {
    this.swipeStartY = event.touches[0].clientY;
  }

  protected moveSwipe(event: TouchEvent): void {
    const PANEL = this.panel().nativeElement;
    const IS_AT_END = PANEL.scrollTop + PANEL.clientHeight >= PANEL.scrollHeight - 1;
    const DISTANCE = this.swipeStartY - event.touches[0].clientY;
    this.swipeOffset.set(IS_AT_END ? Math.max(0, DISTANCE) : 0);
  }

  protected endSwipe(): void {
    const LIMIT = Math.max(SWIPE_MIN_DISTANCE, this.panel().nativeElement.offsetHeight * SWIPE_HEIGHT_RATIO);
    const SHOULD_CLOSE = this.swipeOffset() >= LIMIT;
    this.swipeOffset.set(0);
    if (SHOULD_CLOSE) this.closeMenu();
  }
}
