import { AnimatedContainer } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';
import { Code2, Rocket, Palette } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Чистый код',
    description:
      'Пишу читаемый и масштабируемый код с использованием лучших практик',
  },
  {
    icon: Rocket,
    title: 'Производительность',
    description:
      'Оптимизирую приложения для максимальной скорости и эффективности',
  },
  {
    icon: Palette,
    title: 'UI/UX Дизайн',
    description: 'Создаю красивые и интуитивно понятные интерфейсы',
  },
];

const AboutSection = async () => {
  const t = await getTranslations();
  return (
    <section id={'about'}>
      <AnimatedContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h2 className="text-5xl ml-2 mb-4">{t('sections.about')}</h2>
        <div className="w-50 h-1 bg-accent" />
      </AnimatedContainer>
      <div className="gap-12">
        <AnimatedContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 md:px-0"
        >
          <p className={`text-lg mb-6 text-muted`}>
            Я увлеченный frontend разработчик с опытом создания современных
            веб-приложений. Специализируюсь на React, TypeScript и современных
            CSS фреймворках.
          </p>
          <p className={`text-lg mb-8 text-muted`}>
            Мне нравится превращать сложные задачи в простые и красивые решения.
            Постоянно изучаю новые технологии и следую за трендами в
            веб-разработке.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <AnimatedContainer
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className={`p-3 rounded-lg bg-bg-card h-fit`}>
                  <feature.icon className={'text-accent'} size={24} />
                </div>
                <div>
                  <h3 className={`text-xl mb-2`}>{feature.title}</h3>
                  <p className={'text-muted'}>{feature.description}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};
export default AboutSection;
