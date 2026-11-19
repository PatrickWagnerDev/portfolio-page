import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../shared/reveal/reveal';
import { RoundSticker } from '../../shared/round-sticker/round-sticker';
import { PROJECT_INFOS, ProjectInfo } from '../../data/project-data';
import { getSkillIconPath } from '../../data/skill-data';

@Component({
  imports: [RouterLink, RoundSticker, Reveal, TranslatePipe],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  id = input.required<string>();
  protected visibleProjects = computed(() => PROJECT_INFOS.filter((info) => info.id === this.id()));
  protected previousProject = computed(() => this.getNeighbor(-1));
  protected nextProject = computed(() => this.getNeighbor(1));

  protected readonly getSkillIconPath = getSkillIconPath;

  private getNeighbor(step: number): ProjectInfo {
    const PROJECT_INDEX = PROJECT_INFOS.findIndex((info) => info.id === this.id());
    return PROJECT_INFOS[(PROJECT_INDEX + step + PROJECT_INFOS.length) % PROJECT_INFOS.length];
  }
}