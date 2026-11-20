import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CONTACT_INFO } from '../../data/contact-data';
import { Footer } from '../../layout/footer/footer';
import { Language } from '../../shared/language/language';

/** Privacy policy page. The English version shows a notice that the German text prevails. */
@Component({
  imports: [Footer, RouterLink, TranslatePipe],
  selector: 'app-privacy-policy',
  styleUrl: './privacy-policy.scss',
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  /** Contact data of the controller. */
  protected readonly contact = CONTACT_INFO;
  /** Language service, used to show the translation notice only in English. */
  protected readonly language = inject(Language);
}
