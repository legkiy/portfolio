import { AnimatedContainer } from '@/shared/ui';
import LevelsCard from '@/widgets/LevelsCard';
import { getTranslations } from 'next-intl/server';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 9 },
      { name: 'TypeScript', level: 9 },
      { name: 'Next.js', level: 9 },
      { name: 'Tailwind CSS', level: 9 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', level: 8 },
      { name: 'Figma', level: 6 },
      { name: 'Node.js', level: 9 },
      { name: 'REST API', level: 9 },
    ],
  },
];

const SkillsSection = async () => {
  const t = await getTranslations();
  return (
    <section className="" id="skills">
      <AnimatedContainer
        tag="section"
        id={'about'}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h2 className="text-5xl ml-2 mb-4">{t('sections.skills')}</h2>
        <div className="w-50 h-1 bg-accent" />
      </AnimatedContainer>
      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <LevelsCard
            key={index}
            title={category.title}
            items={category.skills}
          />
        ))}
      </div>
    </section>
  );
};
export default SkillsSection;
