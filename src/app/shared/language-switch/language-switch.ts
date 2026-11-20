import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Language } from '../language/language';

/** Switch to change the language between English and German. */
@Component({
  imports: [TranslatePipe],
  selector: 'app-language-switch',
  styleUrl: './language-switch.scss',
  templateUrl: './language-switch.html',
})
export class LanguageSwitch {
  /** Service that holds and changes the active language. */
  protected readonly language = inject(Language);
}
