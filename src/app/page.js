import Navbar from '../components/Navbar';
import WhoAmISection from '../components/WhoAmISection';
import SkillsSection from '../components/SkillsSection';
import WorkShowcaseSection from '../components/WorkShowcaseSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '@/components/HeroSection';
import CircularText from '@/components/CircularText';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div id="home"></div>
      <HeroSection />

      <div id="about" className="relative -top-40 -z-10 h-32 md:h-28"></div>
      <WhoAmISection />

      <div id="skills" className="relative -top-10 -z-10 h-20 md:h-40"></div>
      <SkillsSection />
      <p className="text-sm md:mt-4">I can also play one (1) song on bass</p>
      
      <div id="projects" className="h-32 md:h-48"></div>
      <WorkShowcaseSection />

      <ContactSection />
    </div>
  );
}
