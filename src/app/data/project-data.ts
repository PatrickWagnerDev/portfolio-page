export interface ProjectInfo {
  id: string;
  title: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  comingSoon: boolean;
}

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
