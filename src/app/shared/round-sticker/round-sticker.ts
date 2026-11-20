import { Component, input } from '@angular/core';

/** Round decorative sticker with text circling around a monogram. */
@Component({
  selector: 'app-round-sticker',
  styleUrl: './round-sticker.scss',
  templateUrl: './round-sticker.html',
  host: { 'aria-hidden': 'true', '[class.sticker-green]': "color() === 'green'" },
})
export class RoundSticker {
  /** Color of the sticker, teal or green. */
  color = input<'teal' | 'green'>('teal');
}