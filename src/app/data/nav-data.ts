/** An entry of the main navigation that scrolls to a section of the home page. */
export interface NavItem {
  /** Id of the target section. */
  fragment: string;
  /** Translation key of the link text. */
  labelKey: string;
}

/** Entries of the navigation bar and the burger menu in display order. */
export const NAV_ITEMS: NavItem[] = [
  { fragment: 'about-me-section', labelKey: 'header.aboutMe' },
  { fragment: 'skills-section', labelKey: 'header.skills' },
  { fragment: 'projects-section', labelKey: 'header.projects' },
  { fragment: 'contact-section', labelKey: 'header.contact' },
];
