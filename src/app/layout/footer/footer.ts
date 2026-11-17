import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  host: { '[class.footer-light]': 'variant() === "light"' },
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly variant = input<'dark' | 'light'>('dark');
  protected readonly currentYear = new Date().getFullYear();
}