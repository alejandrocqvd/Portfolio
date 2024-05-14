import SkillBox from "./components/skillbox";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">

      <div className="flex flex-col justify-center items-center text-center w-full h-screen landing-page-bg bg-cover bg-no-repeat">
        <h1 className="text-8xl">ALEJANDRO</h1>
        <h1 className="text-8xl mt-4 mb-20">CARDONA</h1>
        <p className="text-2xl font-bold">THIS IS GONNA CHANGE!!!!</p>
      </div>

      <p className="text-7xl font-bold text-center mb-20 mt-12">Who Am I?</p>
      <div className="flex flex-row justify-center items-center w-9/12 mb-60">
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
      <div className="flex flex-row justify-center items-center w-9/12 mb-40">
        <div className="flex flex-col justify-center items-center text-left w-full">

          <p className="text-2xl font-bold w-full">LANGUAGES</p>
          <div className="flex flex-row flex-nowrap content-center">
            <SkillBox skillName="SQL" skillImage="/sql-logo.png" />
          </div>

          <p className="text-2xl font-bold w-full">LIBRARIES AND FRAMEWORKS</p>

          <p className="text-2xl font-bold w-full">ENVIRONMENTS AND TOOLS</p>
          
        </div>
      </div>

    </div>
  );
}
