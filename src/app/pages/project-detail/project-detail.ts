import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoundSticker } from '../../shared/round-sticker/round-sticker';
import { PROJECT_INFOS, ProjectInfo } from './project-data';

@Component({
  imports: [RouterLink, RoundSticker],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  id = input.required<string>();
  protected project = computed(() => PROJECT_INFOS.find((info) => info.id === this.id()));
  protected previousProject = computed(() => this.getNeighbor(-1));
  protected nextProject = computed(() => this.getNeighbor(1));

  protected getIconPath(technology: string): string {
    return `/design-material/icons/skills/${technology.toLowerCase()}.png`;
  }

  private getNeighbor(step: number): ProjectInfo {
    const index = PROJECT_INFOS.findIndex((info) => info.id === this.id());
    return PROJECT_INFOS[(index + step + PROJECT_INFOS.length) % PROJECT_INFOS.length];
  }
}