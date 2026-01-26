import { AnimatedContainer } from '@/shared/ui';
type Props = {
  title: string;
  items: {
    name: string;
    level: number;
  }[];
};
const LevelsCard = ({ title, items }: Props) => {
  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`p-6 rounded-2xl bg-bg-card border border-line`}
    >
      <h3 className={`text-2xl mb-6`}>{title}</h3>
      <div className="space-y-6">
        {items.map((skill, skillIndex) => (
          <div key={skillIndex}>
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span className={'text-muted'}>{skill.level}/10</span>
            </div>
            <div className={`h-2 rounded-full bg-bg-second overflow-hidden`}>
              <AnimatedContainer
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level * 10}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.5 + skillIndex * 0.1,
                }}
                className={`h-full rounded-full bg-linear-to-r from-accent to-accent-second`}
              />
            </div>
          </div>
        ))}
      </div>
    </AnimatedContainer>
  );
};
export default LevelsCard;
