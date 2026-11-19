import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { getSocialLinks } from '../../data/contact-data';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-footer',
  host: { '[class.footer-light]': 'variant() === "light"' },
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly variant = input<'dark' | 'light'>('dark');
  protected readonly socialLinks = getSocialLinks(['github', 'linkedin', 'mail']);
  protected readonly currentYear = new Date().getFullYear();
}