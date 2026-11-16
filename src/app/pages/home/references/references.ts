import { Component, signal } from '@angular/core';

interface Reference {
  name: string;
  role: string;
  text: string;
  profileUrl: string;
}

@Component({
  imports: [],
  selector: 'app-references',
  styleUrl: './references.scss',
  templateUrl: './references.html',
})
export class References {
  protected readonly topIndex = signal<number | null>(null);
  protected readonly references: Reference[] = [
    {
      name: 'Tobias Lange',
      role: 'Frontend Developer',
      text: "Karl really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      profileUrl: '',
    },
    {
      name: 'Maria Schäfer',
      role: 'Frontend Developer',
      text: 'It was a great pleasure to work with Karl. He knows how to push and encourage team members to present the best work possible, always adding something to brainstorm. Regarding the well-being of group members, he was always present and available to listen and help others, with a great sense of humor as well.',
      profileUrl: '',
    },
    {
      name: 'David Braun',
      role: 'Frontend Developer',
      text: 'Karl was a top team colleague at DA. His positive commitment and willingness to take on responsibility made a significant contribution to us achieving our goals.',
      profileUrl: '',
    },
  ];
}