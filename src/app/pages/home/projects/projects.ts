import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';
import { PROJECT_INFOS } from '../../../data/project-data';

/** Projects section with one preview card per project and a link to its detail page. */
@Component({
  imports: [RouterLink, Reveal, TranslatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  /** Projects shown as cards. */
  protected readonly projects = PROJECT_INFOS;
}