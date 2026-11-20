import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Reveal } from '../../shared/reveal/reveal';
import { RoundSticker } from '../../shared/round-sticker/round-sticker';
import { PROJECT_INFOS, ProjectInfo } from '../../data/project-data';
import { getSkillIconPath } from '../../data/skill-data';

/**
 * Detail page of one project with description, technologies, preview and links, plus links to the previous and the next project.
 */
@Component({
  imports: [RouterLink, RoundSticker, Reveal, TranslatePipe],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  /** Id of the project from the route, bound with withComponentInputBinding. */
  id = input.required<string>();
  /** The project of the route as a list with one entry, so the template can use a loop to assign it. */
  protected visibleProjects = computed(() => PROJECT_INFOS.filter((info) => info.id === this.id()));
  /** The project before the current one, wraps around to the last project. */
  protected previousProject = computed(() => this.getNeighbor(-1));
  /** The project after the current one, wraps around to the first project. */
  protected nextProject = computed(() => this.getNeighbor(1));

  /** Gives the template access to the icon path helper. */
  protected readonly getSkillIconPath = getSkillIconPath;

  /**
   * Finds a neighbor of the current project in the list and wraps around at both ends.
   * @param step - Distance to the current project, -1 for the previous and 1 for the next one.
   * @returns The neighbor project.
   */
  private getNeighbor(step: number): ProjectInfo {
    const PROJECT_INDEX = PROJECT_INFOS.findIndex((info) => info.id === this.id());
    return PROJECT_INFOS[(PROJECT_INDEX + step + PROJECT_INFOS.length) % PROJECT_INFOS.length];
  }
}