export interface NavItem {
  fragment: string;
  labelKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { fragment: 'about-me-section', labelKey: 'header.aboutMe' },
  { fragment: 'skills-section', labelKey: 'header.skills' },
  { fragment: 'projects-section', labelKey: 'header.projects' },
  { fragment: 'contact-section', labelKey: 'header.contact' },
];
