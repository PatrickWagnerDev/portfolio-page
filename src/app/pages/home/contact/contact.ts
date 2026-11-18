import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../shared/reveal/reveal';
import { RoundSticker } from '../../../shared/round-sticker/round-sticker';

type SendStatus = 'idle' | 'sending' | 'sent' | 'failed';

const MAIL_ENDPOINT = '/contact-form-mail.php';

@Component({
  imports: [FormsModule, RouterLink, RoundSticker, Reveal],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  private readonly http = inject(HttpClient);
  protected readonly status = signal<SendStatus>('idle');
  protected formData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
    website: '',
  };

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

  private getPayload(): object {
    const { name, email, message, website } = this.formData;
    return { name, email, message, website };
  }

  private handleSent(form: NgForm): void {
    this.status.set('sent');
    form.resetForm();
  }
}