import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_INFOS } from '../../project-detail/project-data';

@Component({
  imports: [RouterLink],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECT_INFOS;
}