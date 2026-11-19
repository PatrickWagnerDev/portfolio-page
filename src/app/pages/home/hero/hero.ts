import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Intro, LETTER_STEP_MS } from '../../../shared/intro/intro';

interface TitleLetter {
  char: string;
  delay: number;
}

const TITLE_WORDS = ['Frontend', 'Developer'];
const LETTER_COUNT = Math.max(...TITLE_WORDS.map((word) => word.length));

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
  private readonly intro = inject(Intro);
  readonly phase = this.intro.phase;
  readonly titleLines = this.buildTitleLines();

  ngOnInit(): void {
    this.intro.startIntro(LETTER_COUNT);
  }

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