import { Injectable, signal } from '@angular/core';

export type IntroPhase = 'letters' | 'photo' | 'links' | 'done' | 'skipped';

export const LETTER_STEP_MS = 100;
const LETTER_FLASH_MS = 200;
const PHOTO_MS = 600;
const LINKS_MS = 400;

@Injectable({ providedIn: 'root' })
export class Intro {
  readonly phase = signal<IntroPhase>(this.getStartPhase());
  private timerIds: number[] = [];

  startIntro(letterCount: number): void {
    if (this.phase() !== 'letters') return;
    const LETTERS_END = (letterCount - 1) * LETTER_STEP_MS + LETTER_FLASH_MS;
    window.addEventListener('scroll', () => this.skipIntro(), { once: true });
    this.schedulePhase('photo', LETTERS_END);
    this.schedulePhase('links', LETTERS_END + PHOTO_MS);
    this.schedulePhase('done', LETTERS_END + PHOTO_MS + LINKS_MS);
  }

  private skipIntro(): void {
    if (this.phase() === 'done' || this.phase() === 'skipped') return;
    this.timerIds.forEach((timerId) => window.clearTimeout(timerId));
    this.phase.set('skipped');
  }

  private schedulePhase(phase: IntroPhase, delay: number): void {
    this.timerIds.push(window.setTimeout(() => this.phase.set(phase), delay));
  }

  private getStartPhase(): IntroPhase {
    const IS_HOME = window.location.pathname === '/' && !window.location.hash;
    const IS_CALM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return IS_HOME && !IS_CALM && window.scrollY === 0 ? 'letters' : 'done';
  }
}
