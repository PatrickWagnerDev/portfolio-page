/** A social or contact link shown as icon. */
export interface SocialLink {
  /** Unique id, used to pick and order the links. */
  id: string;
  /** Translation key of the accessible label. */
  labelKey: string;
  /** Target of the link. */
  url: string;
  /** Path of the icon image. */
  iconPath: string;
  /** True when the link leaves the site and opens in a new tab. */
  isExternal: boolean;
}

/** Contact data of the site owner, used in the legal pages, the privacy policy and the mail link. */
export const CONTACT_INFO = {
  name: 'Patrick Wagner',
  street: 'Steinbrechstraße 8C',
  city: '86179 Augsburg',
  phone: '+4915771796004',
  email: 'kontakt@patrickwagnerdev.de',
};

/** All social and contact links. */
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

/**
 * Selects social links in a given order, so each place on the site can show its own order.
 * @param order - Ids of the wanted links, for example github, linkedin and mail.
 * @returns The matching links, unknown ids are skipped.
 */
export function getSocialLinks(order: string[]): SocialLink[] {
  return order
    .map((id) => SOCIAL_LINKS.find((link) => link.id === id))
    .filter((link): link is SocialLink => link !== undefined);
}
