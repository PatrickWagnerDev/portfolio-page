import { Injectable, signal } from '@angular/core';

/** Phases of the hero intro: letters flash, photo appears, links appear, then done or skipped. */
export type IntroPhase = 'letters' | 'photo' | 'links' | 'done' | 'skipped';

/** Delay in milliseconds between the flashes of two neighboring letters. */
export const LETTER_STEP_MS = 100;
/** Duration in milliseconds of one letter flash. */
const LETTER_FLASH_MS = 200;
/** Duration in milliseconds of the photo phase. */
const PHOTO_MS = 600;
/** Duration in milliseconds of the links phase. */
const LINKS_MS = 400;

/** Controls the timing of the hero intro animation and exposes the current phase. */
@Injectable({ providedIn: 'root' })
export class Intro {
  /** Current intro phase. Starts as letters on the home page and as done everywhere else. */
  readonly phase = signal<IntroPhase>(this.getStartPhase());
  /** Ids of the pending phase timers, cleared when the intro is skipped. */
  private timerIds: number[] = [];

  /**
   * Starts the timed phases and lets the first scroll skip the intro.
   * @param letterCount - Number of title letters that flash one after another.
   */
  startIntro(letterCount: number): void {
    if (this.phase() !== 'letters') return;
    const LETTERS_END = (letterCount - 1) * LETTER_STEP_MS + LETTER_FLASH_MS;
    window.addEventListener('scroll', () => this.skipIntro(), { once: true });
    this.schedulePhase('photo', LETTERS_END);
    this.schedulePhase('links', LETTERS_END + PHOTO_MS);
    this.schedulePhase('done', LETTERS_END + PHOTO_MS + LINKS_MS);
  }

  /** Cancels all pending phases and marks the intro as skipped. */
  private skipIntro(): void {
    if (this.phase() === 'done' || this.phase() === 'skipped') return;
    this.timerIds.forEach((timerId) => window.clearTimeout(timerId));
    this.phase.set('skipped');
  }

  /**
   * Switches to a phase after a delay.
   * @param phase - Phase to switch to.
   * @param delay - Delay in milliseconds.
   */
  private schedulePhase(phase: IntroPhase, delay: number): void {
    this.timerIds.push(window.setTimeout(() => this.phase.set(phase), delay));
  }

  /**
   * Decides how the intro starts.
   * @returns letters on the home page at the top without reduced motion, otherwise done.
   */
  private getStartPhase(): IntroPhase {
    const IS_HOME = window.location.pathname === '/' && !window.location.hash;
    const IS_CALM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return IS_HOME && !IS_CALM && window.scrollY === 0 ? 'letters' : 'done';
  }
}
