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
    comingSoon: boolean;
}

const PLACEHOLDER_DETAILS =
    'Short text that describes your role or the workflow for this specific project. Let a recruiter know more about your knowledge and ability to work independently or collaboratively in a structured way.';

export const PROJECT_INFOS: ProjectInfo[] = [
    {
        id: 'join',
        title: 'Join',
        description: 'A kanban board for managing tasks with drag and drop, subtasks, priorities and a contact list. Built in a team with Angular, TypeScript and Supabase.',
        details: PLACEHOLDER_DETAILS,
        duration: '5 weeks',
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
        description: 'A fantasy jump-and-run for keyboard and smartphone, played right in the browser. Fight through three levels, each ending with a boss and each harder than the last. Built with object-oriented JavaScript on a canvas.',
        details: 'The game is written in vanilla JavaScript and rendered on a canvas, with a class hierarchy for characters, enemies, bosses, projectiles and collectibles. Each of the three levels ends with its own boss: a mage, a demon and a dark knight with different attack patterns. Players pick a character and a level, progress is saved in Local Storage, and the game runs on desktop with a keyboard and on mobile with on-screen touch controls. The code is documented with JSDoc.',
        duration: '2 weeks',
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
        description: 'Browse the first 1025 Pokémon with their name, type, size, weight and stats. Use the search bar to find your favourite quickly. Data comes from a REST API.',
        details: 'The Pokédex is built with vanilla JavaScript and fetches its data from the PokéAPI. Pokémon appear as cards with their name, type and image, and a detail view shows more information and stats, with navigation between neighbouring Pokémon. More Pokémon can be loaded on demand, a loading indicator gives feedback while data is fetched, and type icons are cached to avoid unnecessary requests.',
        duration: '1 week',
        technologies: ['HTML', 'CSS', 'JavaScript', 'REST-API'],
        image: '/design-material/project-screenshots/pokedex.webp',
        githubUrl: 'https://github.com/PatrickWagnerDev/Pokedex',
        liveUrl: 'https://pokedex.patrickwagnerdev.de',
        featured: false,
        comingSoon: false,
    },
];