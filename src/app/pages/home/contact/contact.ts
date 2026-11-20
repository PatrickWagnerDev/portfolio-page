import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';
import { RoundSticker } from '../../../shared/round-sticker/round-sticker';

/** State of the contact form while and after sending. */
type SendStatus = 'idle' | 'sending' | 'sent' | 'failed';

/** Address of the PHP script that sends the contact mail. */
const MAIL_ENDPOINT = '/contact-form-mail.php';

/**
 * Contact section with the form. Validates the input, sends it as JSON to the PHP mailer and shows the result.
 */
@Component({
  imports: [FormsModule, RouterLink, RoundSticker, Reveal, TranslatePipe],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  /** HTTP client used to post the form data. */
  private readonly http = inject(HttpClient);
  /** Current send state, drives the button label and the feedback message. */
  protected readonly status = signal<SendStatus>('idle');
  /** Values of the form fields. The field website is a honeypot that real visitors never fill in. */
  protected formData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
    website: '',
  };

  /**
   * Sends the form if it is valid, otherwise shows all field errors. Ignores repeated submits while sending.
   * @param form - The template-driven form that was submitted.
   */
  protected submitForm(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (this.status() === 'sending') return;
    this.status.set('sending');
    this.http.post(MAIL_ENDPOINT, this.getPayload()).subscribe({
      next: () => this.handleSent(form),
      error: () => this.status.set('failed'),
    });
  }

  /**
   * Picks the fields that are sent to the server, the privacy checkbox stays on the client.
   * @returns The request body.
   */
  private getPayload(): object {
    const { name, email, message, website } = this.formData;
    return { name, email, message, website };
  }

  /**
   * Shows the success message and clears the form.
   * @param form - The form to reset.
   */
  private handleSent(form: NgForm): void {
    this.status.set('sent');
    form.resetForm();
  }
}