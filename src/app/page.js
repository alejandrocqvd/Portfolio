import Navbar from '../components/Navbar';
import WhoAmISection from '../components/WhoAmISection';
import SkillsSection from '../components/SkillsSection';
import WorkShowcaseSection from '../components/WorkShowcaseSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div id="home"></div>
      <div className="flex flex-col justify-center items-center text-center w-screen md:w-full h-screen landing-page-bg bg-cover bg-no-repeat mb-20">
        <h1 className="text-4xl md:text-8xl">ALEJANDRO</h1>
        <h1 className="text-4xl md:text-8xl mt-4 mb-10">CARDONA</h1>
        <div className="w-96 overflow-hidden relative whitespace-nowrap">
          <p className="font-bold text-md md:text-lg">Student & Developer</p>
        </div>
      </div>

      <div id="about" className="relative -top-40 -z-10 h-32 md:h-28"></div>
      <WhoAmISection />

      <div id="skills"  className="relative -top-10 -z-10 h-20 md:h-40"></div>
      <SkillsSection />
      <p className="text-sm md:mt-4">I can also play one (1) song on bass</p>
      
      <div id="projects"  className="h-32 md:h-48"></div>
      <WorkShowcaseSection />

      <ContactSection />
    </div>
  );
}
