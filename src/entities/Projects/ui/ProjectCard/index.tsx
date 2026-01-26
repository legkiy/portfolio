import { AnimatedContainer, Image } from '@/shared/ui';
import { ExternalLink, Github } from 'lucide-react';

type Props = {
  imageSrc: string;
  title: string;
  description: string;
  tags: string[];
  links?: {
    name: 'git' | 'external';
    href: string;
  }[];
};

const LINKS_ICONS = {
  git: Github,
  external: ExternalLink,
};

const ProjectCard = ({ description, imageSrc, tags, title, links }: Props) => {
  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ y: -8 }}
      className={`rounded-2xl overflow-hidden bg-bg-card border border-border-line`}
    >
      <div className="overflow-hidden aspect-video">
        <AnimatedContainer
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <Image src={imageSrc} alt={title} />
        </AnimatedContainer>
      </div>

      <div className="p-6">
        <h3 className={`text-2xl mb-3`}>{title}</h3>
        <p className={`mb-4 text-muted`}>{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`px-3 py-1 rounded-full text-sm bg-bg-second text-accent`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {links?.map((link, index) => {
            const Icon = LINKS_ICONS[link.name];
            return (
              <AnimatedContainer
                key={index}
                tag="a"
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-second hover:bg-border-line transition-colors`}
                whileHover={{ scale: 1.05 }}
              >
                <Icon />
              </AnimatedContainer>
            );
          })}
        </div>
      </div>
    </AnimatedContainer>
  );
};
export default ProjectCard;
