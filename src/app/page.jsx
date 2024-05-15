import SkillBox from "./components/skillbox";
import WorkShowcase from "./components/workshowcase";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">

      <div className="flex flex-col justify-center items-center text-center w-full h-screen landing-page-bg bg-cover bg-no-repeat">
        <h1 className="text-8xl">ALEJANDRO</h1>
        <h1 className="text-8xl mt-4 mb-20">CARDONA</h1>
        <p className="text-2xl font-bold">THIS IS GONNA CHANGE!!!!</p>
      </div>

      <p className="text-7xl font-bold text-center mb-20 mt-12">Who Am I?</p>
      <div className="flex flex-row justify-center items-center w-8/12 mb-60">
        <img src="/ski.jpg" className="h-96 w-auto object-cover white-box-shadow flex-1 md:mr-8"/>
        <div className="flex flex-col justify-center items-center flex-1 md:ml-8">
          <p className="text-xl">
            I am a full time student currently enrolled in Computer Science at 
            <span className="font-bold text-red-700"> UCalgary 🦖.</span>
            <br></br><br></br>
            Choosing computer science was a difficult decision to make coming from a family full 
            of doctors where the only right path was medicine. But ever since I took my first 
            programming class,<br></br>
            <span className="font-bold text-red-700">I was hooked.</span>
            <br></br><br></br>
            Before, I was intimidated at the competitiveness of this field, but as Jim Carrey puts it:<br></br><br></br>
          </p>
          <div className="mx-4 my-2 p-4 rounded-lg bg-[#141418] text-center">
            <p className="italic">
              "You can fail at what you don't want, so you might as well take a chance on doing what you love"
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-7xl font-bold text-center mb-20">My Skills</p>
      <div className="flex flex-row justify-center items-center w-8/12 border-l-4 border-r-4 rounded-md md:px-24">
        <div className="flex flex-col justify-center items-center text-left w-full">

          <p className="text-2xl font-bold w-full mb-6">LANGUAGES</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 px-8">
            <SkillBox skillName="SQL" skillImage="/sql-logo.png" bgColour="bg-[#07284a]" rounded="1" />
            <SkillBox skillName="C" skillImage="/c-logo.png" bgColour="bg-[#01417d]" rounded="0" />
            <SkillBox skillName="CSS" skillImage="/css-logo.png" bgColour="bg-[#1a3cc4]" rounded="0" />
            <SkillBox skillName="HTML" skillImage="/html-logo.png" bgColour="bg-[#d3441c]" rounded="0" />
            <SkillBox skillName="JS" skillImage="/javascript-logo.png" bgColour="bg-[#c0a72c]" rounded="0" />
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#dde1e2]" rounded="0" />
            <SkillBox skillName="Python" skillImage="/python-logo.png" bgColour="bg-[#676869]" rounded="0" />
            <SkillBox skillName="Assembly" skillImage="/assembly-logo.png" bgColour="bg-[#3c3d3d]" rounded="2" />
          </div>

          <p className="text-2xl font-bold w-full mb-6">LIBRARIES AND FRAMEWORKS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 px-8">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#0c442f]" rounded="1" />
            <SkillBox skillName="Tailwind" skillImage="/tailwind-logo.png" bgColour="bg-[#116344]" rounded="0" />
            <SkillBox skillName="Swing" skillImage="/swing-logo.png" bgColour="bg-[#157c55]" rounded="0" />
            <SkillBox skillName="NextJS" skillImage="/nextjs-logo.png" bgColour="bg-[#199666]" rounded="0" />
            <SkillBox skillName="NumPy" skillImage="/numpy-logo.png" bgColour="bg-[#1daf76]" rounded="0" />
            <SkillBox skillName="Express" skillImage="/express-logo.png" bgColour="bg-[#21c686]" rounded="2" />
          </div>

          <p className="text-2xl font-bold w-full mb-6">OTHER TOOLS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4 px-8">
            <SkillBox skillName="Photoshop" skillImage="/photoshop-logo.png" bgColour="bg-[#003d5c]" rounded="1" />
            <SkillBox skillName="Bash" skillImage="/bash-logo.png" bgColour="bg-[#004364]" rounded="0" />
            <SkillBox skillName="Git" skillImage="/git-logo.png" bgColour="bg-[#004c72]" rounded="0" />
            <SkillBox skillName="MongoDB" skillImage="/mongodb-logo.png" bgColour="bg-[#005b88]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#006597]" rounded="2" />
          </div>
          
        </div>
      </div>

      <p className="text-sm mb-40 mt-12">I can also play one (1) song on bass</p>
      
      <p className="text-7xl font-bold text-center mb-20 mt-12">My Work</p>
      <div className="flex flex-col justify-center items-center w-8/12">
        <WorkShowcase 
          title="CGC on Campus" 
          subtitle="2024 | UCalgary Club's Website" 
          description="In a team, design and develop a user-friendly and informational website for Canadian Global Care on Campus club."
          techStack="React, Vite, TailwindCSS"
          image="">
        </WorkShowcase>
        <WorkShowcase 
          title="MiHistoria" 
          subtitle="2024 | Social Media Web App" 
          description="To further develop the skills I learnt from developing DinoDB, I wanted to make a social media web app where 
          each user gets one and only post, and in that post, they share their life story."
          techStack="React, Vite, TailwindCSS, NodeJS, TypeScript"
          image=""
          reversed={true}>
        </WorkShowcase>
        <WorkShowcase 
          title="Malware Terminal" 
          subtitle="2023 | Educational & Interactive Terminal" 
          description="For my cybersecurity class, I came up with an idea for my group to design 
          and develop an interactive terminal-like website to educate those interested in everything there is about malware."
          techStack="HTML, CSS, JavaScript"
          image="">
        </WorkShowcase>
        <WorkShowcase 
          title="DinoDB" 
          subtitle="2023 | UCalgary Extracurricular Database" 
          description="In a team for my databases class, we designed and developed a sophisticated database for UCalgary's extracurricular
          activities to bring all necessary information in one place."
          techStack="React, NodeJS, JavaScript, TypeScript, MySQL, TailwindCSS"
          image=""
          reversed={true}>
        </WorkShowcase>
        <WorkShowcase 
          title="Sorting Visualizer" 
          subtitle="2023 | Interactive Visualizer for Sorting Algorithms" 
          description="Learn each sorting algorithm in depth and solidify JavaScript skills by developing an interactive web app where users
          can see the process of each sorting algorithm, step-by-step."
          techStack="HTML, CSS, JavaScript"
          image="">
        </WorkShowcase>
        <WorkShowcase 
          title="CineSeen" 
          subtitle="2023 | Personal Director and Movie Database" 
          description="Develop both the front-end and back-end of a database used for keeping track of your favorite directors 
          and their movies, all in one place."
          techStack="HTML, CSS, JavaScript, NodeJS, MongoDB"
          image=""
          reversed={true}>
        </WorkShowcase>
        <WorkShowcase 
          title="Greenhouse Simulator" 
          subtitle="2023 | Multithreaded Greenhouse Simulator" 
          description="Design a greenhouse simulator that uses Java's multithreading capabilities to continuously monitor 
          the environment's temperature, soil moisture, and humidity."
          techStack="Java, Swing"
          image="">
        </WorkShowcase>
      </div>

      <div className="flex flex-col w-full justify-center items-center bg-[#242327]">
        <div className="w-8/12 pt-14 mb-6 px-16">
          <div className="flex flex-row w-full justify-center items-start mb-14">
            <p className="text-4xl font-bold flex-1">Get in touch</p>
            <div>
              <div className="flex flex-col text-2xl font-medium text-right">
              <p>alejandrocqvd@gmail.com</p>
              <a href="" target="_blank" className="mt-4 hover-underline-animation w-auto">CV</a>
              <a href="https://github.com/alejandrocqvd" target="_blank" className="mt-4 w-auto hover-underline-animation">Github</a>
              <a href="https://www.linkedin.com/in/alejandro-cardona-023282264" target="_blank" className="mt-4 hover-underline-animation">LinkedIn</a>
              <a href="https://www.instagram.com/alejandrocqvd/" target="_blank" className="mt-4 hover-underline-animation">Instagram</a> 
              </div>
            </div>
          </div>
          <p className="text-center">Designed and Developed by Alejandro Cardona</p>
        </div>
      </div>
    </div>
  );
}
