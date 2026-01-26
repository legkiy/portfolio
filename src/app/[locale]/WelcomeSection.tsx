import { AnimatedContainer } from '@/shared/ui';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const WelcomeSection = () => {
  return (
    <AnimatedContainer
      tag="section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100dvh-(var(--spacing-header-height)))] flex w-screen items-center justify-center gap-6"
    >
      <AnimatedContainer
        className="relative size-32 rounded-full"
        variants={itemVariants}
      >
        <AnimatedContainer
          className={`absolute top-0 left-0 z-1 size-full mx-auto rounded-full p-1 bg-linear-to-r to-accent-second from-accent animate-pulse`}
          whileHover={{ scale: 1.02, rotate: 360 }}
          transition={{ duration: 0.4 }}
        />
        <div
          className={`absolute top-0 left-0 z-1 size-full pointer-events-none rounded-full flex items-center justify-center text-4xl bg-bg-card `}
        >
          👨‍💻
        </div>
      </AnimatedContainer>
      <div>
        <AnimatedContainer
          tag="h1"
          variants={itemVariants}
          className={`text-5xl md:text-7xl mb-4`}
        >
          Привет, я{' '}
          <span className="inline-block text-accent">Frontend Разработчик</span>
        </AnimatedContainer>
        <AnimatedContainer
          tag="p"
          variants={itemVariants}
          className={`text-xl md:text-2xl text-muted max-w-2xl mx-auto text-center`}
        >
          Создаю современные, отзывчивые и красивые веб-приложения с
          использованием новейших технологий
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  );
};
export default WelcomeSection;
