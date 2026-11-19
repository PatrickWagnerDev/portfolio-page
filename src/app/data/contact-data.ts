export interface SocialLink {
  id: string;
  labelKey: string;
  url: string;
  iconPath: string;
  isExternal: boolean;
}

export const CONTACT_INFO = {
  name: 'Patrick Wagner',
  street: 'Steinbrechstraße 8C',
  city: '86179 Augsburg',
  phone: '+4915771796004',
  email: 'kontakt@patrickwagnerdev.de',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    labelKey: 'common.linkedin',
    url: 'https://www.linkedin.com/in/patrickwagnerdev/',
    iconPath: '/design-material/icons/linkedin.png',
    isExternal: true,
  },
  {
    id: 'github',
    labelKey: 'common.github',
    url: 'https://github.com/PatrickWagnerDev',
    iconPath: '/design-material/icons/github.png',
    isExternal: true,
  },
  {
    id: 'mail',
    labelKey: 'common.email',
    url: `mailto:${CONTACT_INFO.email}`,
    iconPath: '/design-material/icons/mail.png',
    isExternal: false,
  },
];

export function getSocialLinks(order: string[]): SocialLink[] {
  return order
    .map((id) => SOCIAL_LINKS.find((link) => link.id === id))
    .filter((link): link is SocialLink => link !== undefined);
}
