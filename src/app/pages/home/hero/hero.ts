import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { getSocialLinks } from '../../../data/contact-data';
import { Intro, LETTER_STEP_MS } from '../../../shared/intro/intro';

/** One letter of the hero title with its position in the flash sequence of the intro. */
interface TitleLetter {
  /** The letter itself. */
  char: string;
  /** Delay in milliseconds before the letter flashes during the intro. */
  delay: number;
}

/** Words of the hero title, one per line. */
const TITLE_WORDS = ['Frontend', 'Developer'];
/** Length of the longest title word, the intro flashes that many letters. */
const LETTER_COUNT = Math.max(...TITLE_WORDS.map((word) => word.length));

/**
 * Hero section with greeting, animated title, photo, call to action and social links. Starts the intro animation.
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  host: {
    '[class.intro-letters]': "phase() === 'letters'",
    '[class.intro-photo]': "phase() === 'photo'",
    '[class.intro-links]': "phase() === 'links'",
  },
})
export class Hero implements OnInit {
  /** Service that runs the timed intro phases. */
  private readonly intro = inject(Intro);
  /** Current intro phase, mirrored as host classes for the CSS. */
  protected readonly phase = this.intro.phase;
  /** Title split into lines of single letters for the flash animation. */
  protected readonly titleLines = this.buildTitleLines();
  /** Social links in the order of the hero. */
  protected readonly socialLinks = getSocialLinks(['linkedin', 'github', 'mail']);

  /** Starts the intro once the hero is created. */
  ngOnInit(): void {
    this.intro.startIntro(LETTER_COUNT);
  }

  /**
   * Splits the title words into letters and assigns each letter its flash delay.
   * The first word flashes from left to right, the second one from right to left.
   * @returns One array of letters per title word.
   */
  private buildTitleLines(): TitleLetter[][] {
    return TITLE_WORDS.map((word, wordIndex) => {
      const WORD_LETTERS = word.split('');
      return WORD_LETTERS.map((char, index) => {
        const ORDER_INDEX = wordIndex === 0 ? index : WORD_LETTERS.length - 1 - index;
        return { char, delay: ORDER_INDEX * LETTER_STEP_MS };
      });
    });
  }
}