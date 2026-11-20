/** A project with the data that does not depend on the language. Texts come from the translations by id. */
export interface ProjectInfo {
  /** Id used in the route and as key of the translated texts. */
  id: string;
  /** Project name, the same in every language. */
  title: string;
  /** Technologies shown as icons on the detail page. */
  technologies: string[];
  /** Path of the preview screenshot. */
  image: string;
  /** Link to the repository, empty while not available. */
  githubUrl: string;
  /** Link to the running project, empty while not available. */
  liveUrl: string;
  /** True for the project that gets the featured sticker. */
  featured: boolean;
  /** True while the project is not finished, its detail page is blurred then. */
  comingSoon: boolean;
}

/** Projects in display order. */
export const PROJECT_INFOS: ProjectInfo[] = [
  {
    id: 'join',
    title: 'Join',
    technologies: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Supabase'],
    image: '/design-material/project-screenshots/join.webp',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    comingSoon: true,
  },
  {
    id: 'the-last-spellbound',
    title: 'The Last Spellbound',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/design-material/project-screenshots/the-last-spellbound.webp',
    githubUrl: 'https://github.com/PatrickWagnerDev/The_Last_Spellbound',
    liveUrl: 'https://the-last-spellbound.patrickwagnerdev.de',
    featured: false,
    comingSoon: false,
  },
  {
    id: 'pokedex',
    title: 'Pokédex',
    technologies: ['HTML', 'CSS', 'JavaScript', 'REST-API'],
    image: '/design-material/project-screenshots/pokedex.webp',
    githubUrl: 'https://github.com/PatrickWagnerDev/Pokedex',
    liveUrl: 'https://pokedex.patrickwagnerdev.de',
    featured: false,
    comingSoon: false,
  },
];
