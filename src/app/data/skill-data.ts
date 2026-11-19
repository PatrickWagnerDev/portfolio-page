export interface SkillInfo {
  name: string;
  iconPath: string;
}

const SKILL_ICON_PATH = '/design-material/icons/skills';
const SKILL_NAMES = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'Firebase', 'Supabase', 'Git', 'REST-API', 'Scrum'];
const INTEREST_NAMES = ['Python', 'Django'];

export function getSkillIconPath(name: string): string {
  return `${SKILL_ICON_PATH}/${name.toLowerCase()}.png`;
}

export const SKILL_INFOS: SkillInfo[] = SKILL_NAMES.map((name) => ({
  name,
  iconPath: getSkillIconPath(name),
}));

export const INTEREST_INFOS: SkillInfo[] = INTEREST_NAMES.map((name) => ({
  name,
  iconPath: `${SKILL_ICON_PATH}/interested-in/${name.toLowerCase()}.png`,
}));
