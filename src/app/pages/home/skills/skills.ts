import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { INTEREST_INFOS, SKILL_INFOS } from '../../../data/skill-data';
import { Reveal } from '../../../shared/reveal/reveal';

/**
 * Skills section with a short description, the skill icons and the peelable sticker with further interests.
 */
@Component({
  imports: [Reveal, TranslatePipe],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  /** Skills shown as icons. */
  protected readonly skillInfos = SKILL_INFOS;
  /** Interests shown on the back of the sticker. */
  protected readonly interestInfos = INTEREST_INFOS;
}
