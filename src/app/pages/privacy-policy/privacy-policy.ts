import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CONTACT_INFO } from '../../data/contact-data';
import { Footer } from '../../layout/footer/footer';
import { Language } from '../../shared/language/language';

@Component({
  imports: [Footer, TranslatePipe],
  selector: 'app-privacy-policy',
  styleUrl: './privacy-policy.scss',
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  protected readonly contact = CONTACT_INFO;
  protected readonly language = inject(Language);
}
