import Head from 'next/head';
import dynamic from 'next/dynamic';
import WhoAmISection from './components/WhoAmISection';
import SkillsSection from './components/SkillsSection';
import WorkShowcaseSection from './components/WorkShowcaseSection';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>Intersection Observer Example</title>
        <meta name="description" content="Next.js Intersection Observer Example" />
      </Head>

      <div className="flex flex-col justify-center items-center text-center w-full h-screen landing-page-bg bg-cover bg-no-repeat">
        <h1 className="text-8xl">ALEJANDRO</h1>
        <h1 className="text-8xl mt-4 mb-20">CARDONA</h1>
        <p className="text-2xl font-bold">THIS IS GONNA CHANGE!!!!</p>
      </div>

      <WhoAmISection />

      <SkillsSection />

      <p className="text-sm mb-40 mt-12">I can also play one (1) song on bass</p>
      
      <WorkShowcaseSection />

      <div className="flex flex-col w-full justify-center items-center bg-[#242327]">
        <div className="w-8/12 pt-14 mb-6 px-16">
          <div className="flex flex-row w-full justify-center items-start mb-14">
            <p className="text-4xl font-bold flex-1">Get in touch</p>
            <div>
              <div className="flex flex-col text-2xl font-medium text-right">
                <p>alejandrocqvd@gmail.com</p>
                <a href="" target="_blank" className="mt-4 hover-underline w-auto hover:text-[#666666]">CV</a>
                <a href="https://github.com/alejandrocqvd" target="_blank" className="mt-4 hover:text-[#666666]">Github</a>
                <a href="https://www.linkedin.com/in/alejandro-cardona-023282264" target="_blank" className="mt-4 hover:text-[#666666]">LinkedIn</a>
                <a href="https://www.instagram.com/alejandrocqvd/" target="_blank" className="mt-4 hover:text-[#666666]">Instagram</a> 
              </div>
            </div>
          </div>
          <p className="text-center">Designed and Developed by Alejandro Cardona</p>
        </div>
      </div>
    </div>
  );
}
