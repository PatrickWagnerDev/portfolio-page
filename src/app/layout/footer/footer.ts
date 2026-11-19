import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-footer',
  host: { '[class.footer-light]': 'variant() === "light"' },
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly variant = input<'dark' | 'light'>('dark');
  protected readonly currentYear = new Date().getFullYear();
}