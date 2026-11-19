import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';

interface Reference {
  id: string;
  name: string;
  profileUrl: string;
}

@Component({
  imports: [Reveal, TranslatePipe],
  selector: 'app-references',
  styleUrl: './references.scss',
  templateUrl: './references.html',
})
export class References {
  protected readonly topIndex = signal<number | null>(null);
  protected readonly references: Reference[] = [
    { id: 'first', name: 'Tobias Lange', profileUrl: '' },
    { id: 'second', name: 'Maria Schäfer', profileUrl: '' },
    { id: 'third', name: 'David Braun', profileUrl: '' },
  ];
}
