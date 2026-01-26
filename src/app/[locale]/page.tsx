import WelcomeSection from './WelcomeSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import MyProjectsSection from './MyProjectsSection';

export default function Home() {
  return (
    <main>
      <WelcomeSection />
      <div className="bg-bg-second pt-6 grid md:grid-cols-2 p-6">
        <AboutSection />
        <SkillsSection />
      </div>
      <MyProjectsSection />
    </main>
  );
}
