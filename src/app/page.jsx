import Navbar from '../components/Navbar';
import About from '../components/About';
import Skills from '../components/Skills';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Hero from '@/components/Hero';
import CircularText from '@/components/CircularText';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div id="home"></div>
      <Hero />

      <div id="about" className="relative -top-40 -z-10 h-32 md:h-28"></div>
      <About />

      <div id="skills" className="relative -top-10 -z-10 h-20 md:h-40"></div>
      <Skills />
      <p className="text-sm md:mt-4">I can also play one (1) song on bass</p>
      
      <div id="projects" className="h-32 md:h-48"></div>
      <Work />

      <Contact />
    </div>
  );
}
