import { Component, inject, OnInit } from '@angular/core';
import { Intro, LETTER_STEP_MS } from '../../../shared/intro/intro';

interface TitleLetter {
  char: string;
  delay: number;
}

const TITLE_WORDS = ['Frontend', 'Developer'];

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  host: {
    '[class.intro-letters]': "phase() === 'letters'",
    '[class.intro-photo]': "phase() === 'photo'",
    '[class.intro-skipped]': "phase() === 'skipped'",
  },
})
export class Hero implements OnInit {
  private readonly intro = inject(Intro);
  readonly phase = this.intro.phase;
  readonly titleLines = this.buildTitleLines();

  ngOnInit(): void {
    this.intro.start(TITLE_WORDS.join('').length);
  }

  private buildTitleLines(): TitleLetter[][] {
    let letterOffset = 0;
    return TITLE_WORDS.map((word, wordIndex) => {
      const LETTERS = word.split('');
      const LINE = LETTERS.map((char, index) => {
        const STEP = wordIndex === 0 ? index : LETTERS.length - 1 - index;
        return { char, delay: (letterOffset + STEP) * LETTER_STEP_MS };
      });
      letterOffset += LETTERS.length;
      return LINE;
    });
  }
}