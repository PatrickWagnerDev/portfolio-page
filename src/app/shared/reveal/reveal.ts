import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/** Share of the element (0 to 1) that must be visible before it counts as revealed. */
const REVEAL_THRESHOLD = 0.2;

/**
 * Adds the class reveal-visible once the host element scrolls into view, so CSS can play a reveal animation.
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  /** Host element of the directive. */
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Observes the host element until it is revealed. */
  private observer?: IntersectionObserver;

  /** Starts observing the host element. */
  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => this.handleIntersect(entries), {
      threshold: REVEAL_THRESHOLD,
    });
    this.observer.observe(this.element.nativeElement);
  }

  /** Stops the observer. */
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Marks the element as revealed when it is visible or already scrolled past.
   * @param entries - Intersection entries delivered by the observer.
   */
  private handleIntersect(entries: IntersectionObserverEntry[]): void {
    const IS_REACHED = entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0);
    if (!IS_REACHED) return;
    this.element.nativeElement.classList.add('reveal-visible');
    this.observer?.disconnect();
  }
}
