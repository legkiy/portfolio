import type { IconType } from 'react-icons';
import { FiAtSign, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

export interface Contact {
  id: string;
  label: string;
  href: string;
  icon: IconType;
}

export const mockData: Contact[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/Legkeey',
    icon: FiSend,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/legkiy',
    icon: FiGithub,
  },
  { id: 'email', label: 'Email', href: 'iamlegkiy@gmail.com', icon: FiAtSign },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nikita-maxakov-999b07293?utm_source=share_via&utm_content=profile',
    icon: FiLinkedin,
  },
  {
    id: 'hhru',
    label: 'hh.ru',
    href: 'https://hh.ru/resume/3a290d0eff0b39cafe0039ed1f773075397366',
    icon: FiLinkedin,
  },
];
