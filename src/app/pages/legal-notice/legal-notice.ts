import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CONTACT_INFO } from '../../data/contact-data';
import { Footer } from '../../layout/footer/footer';

@Component({
  imports: [Footer, RouterLink, TranslatePipe],
  selector: 'app-legal-notice',
  styleUrl: './legal-notice.scss',
  templateUrl: './legal-notice.html',
})
export class LegalNotice {
  protected readonly contact = CONTACT_INFO;
}
