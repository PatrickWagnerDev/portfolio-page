import { Component, input } from '@angular/core';

@Component({
  selector: 'app-round-sticker',
  styleUrl: './round-sticker.scss',
  templateUrl: './round-sticker.html',
  host: { 'aria-hidden': 'true', '[class.sticker-green]': "color() === 'green'" },
})
export class RoundSticker {
  color = input<'teal' | 'green'>('teal');
}