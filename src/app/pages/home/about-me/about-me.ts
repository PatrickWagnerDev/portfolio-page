import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';

/** About me section with the personal introduction and three paper snippets with key facts. */
@Component({
  imports: [Reveal, TranslatePipe],
  selector: 'app-about-me',
  styleUrl: './about-me.scss',
  templateUrl: './about-me.html',
})
export class AboutMe {}
