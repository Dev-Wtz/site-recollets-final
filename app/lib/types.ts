/**
 * Types partagés de l'application
 */

export interface ContactInfo {
  phone: string;
  phoneTel: string;
  email: string;
}

export interface StructureContacts {
  secretariat: ContactInfo;
  vieScolaire: ContactInfo;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem {
  label: string;
  key: string;
  dropdownAlign?: 'left' | 'right';
  hideOnHome?: boolean;
  links: NavLink[];
}

export interface Event {
  titre: string;
  date: string;
  texte: string;
  link: string;
  dateSort?: Date;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
