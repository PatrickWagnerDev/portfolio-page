import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_INFOS } from './project-data';

@Component({
  imports: [RouterLink],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  id = input.required<string>();
  protected project = computed(() => PROJECT_INFOS.find((info) => info.id === this.id()));
  protected nextProject = computed(() => {
    const index = PROJECT_INFOS.findIndex((info) => info.id === this.id());
    return PROJECT_INFOS[(index + 1) % PROJECT_INFOS.length];
  });

  protected getIconPath(technology: string): string {
    return `/design-material/icons/skills/${technology.toLowerCase()}.png`;
  }
}