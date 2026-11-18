import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../shared/reveal/reveal';
import { PROJECT_INFOS } from '../../project-detail/project-data';

@Component({
  imports: [RouterLink, Reveal],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECT_INFOS;
}