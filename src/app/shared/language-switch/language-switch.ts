import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Language } from '../language/language';

@Component({
  imports: [TranslatePipe],
  selector: 'app-language-switch',
  styleUrl: './language-switch.scss',
  templateUrl: './language-switch.html',
})
export class LanguageSwitch {
  protected readonly language = inject(Language);
}
