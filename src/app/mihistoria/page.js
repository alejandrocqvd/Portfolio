import SkillBox from '../../components/SkillBox';

export default function MiHistoria() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-9/12 md:w-8/12 m-auto my-14">

        <h1 className="font-bold text-4xl md:text-6xl text-center mb-8 bg-clip-text text-transparent bg-gradient">MiHistoria</h1>

        <div className="flex flex-row justify-center items-center">
          <a 
            href="https://github.com/alejandrocqvd/MiHistoria" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 mr-3 hover:opacity-70"
          >
            <p className="text-md md:text-lg">GitHub</p>
            <img 
              src="/github-logo.png" 
              alt="GitHub logo" 
              className="h-6 w-auto object-cover" 
            />
          </a>
          <a 
            href="https://mihistoria.vercel.app/" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 ml-3 hover:opacity-70"
          >
            <p className="text-md md:text-lg">Website</p>
            <img 
              src="/website-icon.png" 
              alt="Website icon" 
              className="h-6 w-auto object-cover" 
            />
          </a>
        </div>

        <video 
          src="/mihistoria-demo.mp4" 
          alt="MiHistoria Demo"
          className="h-auto md:w-9/12 white-box-shadow rounded-xl my-8"
          controls 
          autoPlay
          loop
          muted
        >
            Your browser does not support videos.
        </video>

        <div className="text-lg mt-4 w-11/12 md:w-8/12">
          <p className="text-4xl font-bold my-4 text-center">What is MiHistoria?</p>
          <p>
            MiHistoria is a social media web application where each user is given one chance to 
            share their entire life story in a single post. Here, users can use TinyMCE&apos;s
            rich text editor to write and format their stories, allowing them to express themselves 
            with the desired level of detail and creativity.<br></br><br></br> Additionally, users can:
          </p>

          <ul className="list-disc list-inside mt-6">
            <li className="md:ml-6 mb-4">
              <strong>Engage with Others&apos; Stories:</strong> Like, comment on, and save stories 
              from other users, fostering a sense of community and connection.
            </li>
            <li className="md:ml-6 mb-4">
              <strong>Choose Your Privacy:</strong> Write stories anonymously or publicly, providing 
              flexibility and privacy according to their comfort level.
            </li>
            <li className="md:ml-6 mb-4">
              <strong>Explore Human Experiences:</strong> Read a diverse collection of personal narratives 
              from people around the world.
            </li>
          </ul>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Project Goals</p>
          <p>
            After completing DinoDB, I wanted to solidify my understanding of various modern web development 
            technologies and practices. I focused on building and integrating RESTful APIs for my server-client 
            interactions and made these APIs handle CRUD operations, user authentication, and data management. 
            Additionally, working on MiHistoria allowed me to get comfortable with TypeScript and TailwindCSS.
            <br></br><br></br>
            <span className="font-bold">DISCLAIMER: </span> Because my backend is hosted on SupaBase, I had to switch the SQL 
            code to work with PostgreSQL instead of MySQL and also had to change the way image uploading is handled, switching from 
            using Multer to store the images locally in my repository to using the storage from SupaBase. This has not been implemented yet, \
            therefore image uploading / viewing is still in progress for the hosted app!
          </p>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Tech Stack</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#4c0098]" rounded="1" />
            <SkillBox skillName="Vite" skillImage="/vite-logo.png" bgColour="bg-[#550086]" rounded="0" />
            <SkillBox skillName="TypeScript" skillImage="/typescript-logo.png" bgColour="bg-[#5f0073]" rounded="0" />
            <SkillBox skillName="TailwindCSS" skillImage="/tailwind-logo.png" bgColour="bg-[#69005f]" rounded="0" />
            <SkillBox skillName="Node.js" skillImage="/nodejs-logo.png" bgColour="bg-[#72014e]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#7a013e]" rounded="2" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
