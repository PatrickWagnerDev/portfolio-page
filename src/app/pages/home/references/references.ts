import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';

/** A reference from a colleague. The text and the role come from the translations by id. */
interface Reference {
  /** Id used to look up the translated text and role. */
  id: string;
  /** Name of the person. */
  name: string;
  /** Link to the profile of the person, empty while not available. */
  profileUrl: string;
}

/** Section with the references of colleagues as overlapping cards. */
@Component({
  imports: [Reveal, TranslatePipe],
  selector: 'app-references',
  styleUrl: './references.scss',
  templateUrl: './references.html',
})
export class References {
  /** Index of the card the visitor hovers or focuses, that card is brought to the front. */
  protected readonly topIndex = signal<number | null>(null);
  /** The references shown as cards. */
  protected readonly references: Reference[] = [
    { id: 'first', name: 'Tobias Lange', profileUrl: '' },
    { id: 'second', name: 'Maria Schäfer', profileUrl: '' },
    { id: 'third', name: 'David Braun', profileUrl: '' },
  ];
}
