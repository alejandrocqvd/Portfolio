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
      <Hero />
      <About />
      {/* <Skills /> */}
      {/* <p className="text-sm md:mt-4">I can also play one (1) song on bass</p> */}
      {/* <Work /> */}
      <Contact />
    </div>
  );
}
