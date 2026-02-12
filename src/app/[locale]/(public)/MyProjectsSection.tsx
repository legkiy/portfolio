import { ProjectCard } from '@/entities/Projects';
import { AnimatedContainer } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';

const projects: {
  imageSrc: string;
  title: string;
  description: string;
  tags: string[];
  links?: {
    name: 'git' | 'external';
    href: string;
  }[];
}[] = [
  {
    title: 'E-commerce Platform',
    description:
      'Полнофункциональная платформа электронной коммерции с корзиной, оплатой и панелью администратора',
    imageSrc:
      'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2OTM0MDI1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    links: [
      {
        name: 'git',
        href: '#',
      },
      {
        name: 'external',
        href: '#',
      },
    ],
  },
  {
    title: 'Web Design Agency',
    description:
      'Современный сайт веб-дизайн агентства с анимациями и интерактивными элементами',
    imageSrc:
      'https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzY5MjkwNTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Next.js', 'Motion', 'Tailwind CSS'],
    links: [
      {
        name: 'git',
        href: '#',
      },
      {
        name: 'external',
        href: '#',
      },
    ],
  },
  {
    title: 'Mobile App Dashboard',
    description:
      'Адаптивная панель управления для мобильного приложения с графиками и аналитикой',
    imageSrc:
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5MzExNjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'Recharts', 'TypeScript'],
    links: [
      {
        name: 'git',
        href: '#',
      },
      {
        name: 'external',
        href: '#',
      },
    ],
  },
];

const MyProjectsSection = async () => {
  const t = await getTranslations();
  return (
    <section id="projects" className="p-6">
      <AnimatedContainer
        tag="section"
        id={'about'}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h2 className="text-5xl ml-2 mb-4">{t('sections.projects')}</h2>
        <div className="w-50 h-1 bg-accent" />
      </AnimatedContainer>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard {...project} key={index} />
        ))}
      </div>
    </section>
  );
};
export default MyProjectsSection;
