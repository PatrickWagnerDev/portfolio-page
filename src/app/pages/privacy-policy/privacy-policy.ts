import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Footer } from '../../layout/footer/footer';
import { Language } from '../../shared/language/language';

@Component({
  imports: [Footer, TranslatePipe],
  selector: 'app-privacy-policy',
  styleUrl: './privacy-policy.scss',
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  readonly language = inject(Language);
}
