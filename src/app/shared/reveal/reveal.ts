import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

const REVEAL_THRESHOLD = 0.2;

@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => this.handleIntersect(entries), {
      threshold: REVEAL_THRESHOLD,
    });
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private handleIntersect(entries: IntersectionObserverEntry[]): void {
    const IS_REACHED = entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0);
    if (!IS_REACHED) return;
    this.element.nativeElement.classList.add('reveal-visible');
    this.observer?.disconnect();
  }
}
