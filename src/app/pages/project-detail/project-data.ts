export interface ProjectInfo {
    id: string;
    title: string;
    description: string;
    details: string;
    duration: string;
    technologies: string[];
    image: string;
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
}

const PLACEHOLDER_DETAILS =
    'Short text that describes your role or the workflow for this specific project. Let a recruiter know more about your knowledge and ability to work independently or collaboratively in a structured way.';

export const PROJECT_INFOS: ProjectInfo[] = [
    {
        id: 'join',
        title: 'Join',
        description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        details: PLACEHOLDER_DETAILS,
        duration: '5 weeks',
        technologies: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Supabase'],
        image: '/design-material/project-screenshots/join.webp',
        githubUrl: '',
        liveUrl: '',
        featured: true,
    },
    {
        id: 'the-last-spellbound',
        title: 'The Last Spellbound',
        description: 'Jump, run and throw game based on object-oriented approach. Help the wizard to defeat the monsters and earn the trophy.',
        details: PLACEHOLDER_DETAILS,
        duration: '5 weeks',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: '/design-material/project-screenshots/the-last-spellbound.webp',
        githubUrl: '',
        liveUrl: '',
        featured: false,
    },
    {
        id: 'pokedex',
        title: 'Pokédex',
        description: 'An interactive Pokédex, showcasing the integration and use of external APIs. Powered by PokéAPI, it dynamically fetches and displays Pokémon data in a clean and user-friendly interface.',
        details: PLACEHOLDER_DETAILS,
        duration: '5 weeks',
        technologies: ['HTML', 'CSS', 'JavaScript', 'REST-API'],
        image: '/design-material/project-screenshots/pokedex.webp',
        githubUrl: '',
        liveUrl: '',
        featured: false,
    },
];