import type { IconType } from 'react-icons';
import { FiAtSign, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { HhRuIcon } from '../ui/hh-ru-icon';

export type Contact = {
  id: string;
  label: string;
  value: string;
  icon: IconType;
  type: 'email' | 'link';
};

export function getContactHref(contact: Contact) {
  if (contact.type === 'link') return contact.value;

  return `mailto:${encodeURIComponent(contact.value).replace('%40', '@')}`;
}

export const mockData: Contact[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: 'https://t.me/Legkeey',
    type: 'link',
    icon: FiSend,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'https://github.com/legkiy',
    type: 'link',

    icon: FiGithub,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'iamlegkiy@gmail.com',
    type: 'email',
    icon: FiAtSign,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value:
      'https://www.linkedin.com/in/nikita-maxakov-999b07293?utm_source=share_via&utm_content=profile',
    type: 'link',
    icon: FiLinkedin,
  },
  {
    id: 'hhru',
    label: 'hh.ru',
    value: 'https://hh.ru/resume/3a290d0eff0b39cafe0039ed1f773075397366',
    type: 'link',
    icon: HhRuIcon,
  },
];
