const SkillBox = (props) => {
  const { skillName, skillImage, bgColour, rounded } = props;
  
  return (
    <div className={`skill-box h-12 xl:h-16 w-full ${bgColour} ${rounded == 1 ? "rounded-l-lg" : (rounded == 2 ? "rounded-r-lg" : "") }`}>
      <div className="blur-container">
        <img className="skill-image h-full w-full" src={skillImage} alt={skillName} />
      </div>
      <p className="skill-text font-normal xl:font-bold text-sm xl:text-md drop-shadow-2xl">{skillName}</p>
    </div>
  );
}

export default function DinoDB() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-9/12 md:w-8/12 m-auto my-14">

        <p className="font-bold text-4xl md:text-6xl text-center mb-8">DinoDB</p>

        <div className="flex flex-row justify-center items-center">
          <a 
            href="https://github.com/e-woo/dinodb" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 hover:opacity-70"
          >
            <p className="text-md md:text-lg">GitHub</p>
            <img 
              src="/github-logo.png" 
              alt="GitHub logo" 
              className="h-6 w-auto object-cover" 
            />
          </a>
        </div>

        <iframe 
          src="https://www.youtube.com/embed/t84lqLT7D94?autoplay=1&loop=1&mute=1" 
          className=" h-96 md:w-9/12 white-box-shadow rounded-xl my-8"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        >
        </iframe>

        <div className="text-lg mt-4 w-11/12 md:w-8/12">
          <p className="text-4xl font-bold my-4 text-center">What is DinoDB?</p>
          <p>
            DinoDB is a database-driven web application designed to centralize the process of 
            discovering and managing extracurricular activities at my university, the University 
            of Calgary. DinoDB acts as a hub for all relevant information on clubs, volunteering 
            opportunities, programs, and events. Users can registers as students or executives, 
            where both accounts can join and leave extracurricular activities, but only executives can create, 
            modify, and delete extracurricular activities they created.
          </p>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Project Goals</p>
          <p>
            For my DBMS class, we were tasked with planning out, designing, and developing a web 
            application. Although PHP was recommended for the frontend, but we wanted to broaden 
            our skills by utilizing modern web technologies. Our project goals included learning 
            React, TypeScript, and TailwindCSS to create a dynamic and responsive user interface. 
            After we were done with our project and presented it to our TA, they told us that it 
            was the best project they had reviewed for this term.
          </p>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Tech Stack</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#6c0000]" rounded="1" />
            <SkillBox skillName="JavaScript" skillImage="/javascript-logo.png" bgColour="bg-[#820303]" rounded="0" />
            <SkillBox skillName="TypeScript" skillImage="/typescript-logo.png" bgColour="bg-[#940606]" rounded="0" />
            <SkillBox skillName="TailwindCSS" skillImage="/tailwind-logo.png" bgColour="bg-[#a70909]" rounded="0" />
            <SkillBox skillName="Node.js" skillImage="/nodejs-logo.png" bgColour="bg-[#ba0c0c]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#cf0f0f]" rounded="2" />
          </div>

        </div>
      </div>
    </div>
  );
}
