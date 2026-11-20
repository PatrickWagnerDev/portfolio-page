import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { getSocialLinks } from '../../data/contact-data';

/**
 * Site footer with logo, copyright, legal notice and social links. The light variant is used on the legal pages.
 */
@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-footer',
  host: { '[class.footer-light]': 'variant() === "light"' },
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  /** Color variant, dark for the home page and light for the legal pages. */
  readonly variant = input<'dark' | 'light'>('dark');
  /** Social links in the order of the footer. */
  protected readonly socialLinks = getSocialLinks(['github', 'linkedin', 'mail']);
  /** Year shown in the copyright line. */
  protected readonly currentYear = new Date().getFullYear();
}