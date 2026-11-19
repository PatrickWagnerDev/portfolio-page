import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { INTEREST_INFOS, SKILL_INFOS } from '../../../data/skill-data';
import { Reveal } from '../../../shared/reveal/reveal';

@Component({
  imports: [Reveal, TranslatePipe],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly skillInfos = SKILL_INFOS;
  protected readonly interestInfos = INTEREST_INFOS;
}
