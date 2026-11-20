/** A skill or interest with its icon. */
export interface SkillInfo {
  /** Display name, also used to build the icon file name. */
  name: string;
  /** Path of the icon image. */
  iconPath: string;
}

/** Folder of the skill icons. */
const SKILL_ICON_PATH = '/design-material/icons/skills';
/** Skills in display order. Each name needs a matching lower case icon file. */
const SKILL_NAMES = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'Firebase', 'Supabase', 'Git', 'REST-API', 'Scrum'];
/** Technologies the owner wants to learn next, shown on the back of the sticker. */
const INTEREST_NAMES = ['Python', 'Django'];

/**
 * Builds the icon path of a skill or technology.
 * @param name - Name of the skill, for example Angular.
 * @returns The path of the lower case png file.
 */
export function getSkillIconPath(name: string): string {
  return `${SKILL_ICON_PATH}/${name.toLowerCase()}.png`;
}

/** Skills with their icons. */
export const SKILL_INFOS: SkillInfo[] = SKILL_NAMES.map((name) => ({
  name,
  iconPath: getSkillIconPath(name),
}));

/** Interests with their icons from the interested-in folder. */
export const INTEREST_INFOS: SkillInfo[] = INTEREST_NAMES.map((name) => ({
  name,
  iconPath: `${SKILL_ICON_PATH}/interested-in/${name.toLowerCase()}.png`,
}));
