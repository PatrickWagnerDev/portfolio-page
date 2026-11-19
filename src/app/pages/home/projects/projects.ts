import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../../shared/reveal/reveal';
import { PROJECT_INFOS } from '../../../data/project-data';

@Component({
  imports: [RouterLink, Reveal, TranslatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECT_INFOS;
}