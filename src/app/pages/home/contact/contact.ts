import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoundSticker } from '../../../shared/round-sticker/round-sticker';

@Component({
  imports: [FormsModule, RouterLink, RoundSticker],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  protected formData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
    website: '',
  };
}