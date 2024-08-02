import SkillBox from "../../components/SkillBox";

export default function GreenhouseSimulator() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-9/12 md:w-8/12 m-auto my-14">

        <p className="font-bold text-4xl md:text-6xl text-center mb-8">Greenhouse Simulator</p>

        <video 
          src="/greenhouse-simulator-demo.mp4" 
          alt="Greenhouse Simulator Demo"
          className="h-auto md:w-9/12 white-box-shadow rounded-xl my-8"
          controls 
          autoPlay
          loop
          muted
        >
            Your browser does not support videos.
        </video>

        <div className="text-lg mt-4 w-11/12 md:w-8/12">
          <p className="text-4xl font-bold my-4 text-center">How Does it Work?</p>
          <p>
            This greenhouse simulator is a Java application designed to replicate the environmental 
            conditions within a greenhouse. Utilizing multithreading, the simulator can concurrently 
            manage and simulate three critical environmental factors: temperature, humidity, and 
            soil moisture, with each factor running on its own thread. Java Swing is used for the 
            frontend to enhance user experience. Users can easily monitor each of the factors and 
            also see if the air conditioning, furnace, sprinkler, or humidifier are active, 
            providing a comprehensive and interactive way to control and observe the greenhouse 
            environment in real-time.
          </p>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Tech Stack</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4">
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#0016a2]" rounded="1" />
            <SkillBox skillName="Swing" skillImage="/swing-logo.png" bgColour="bg-[#0019b9]" rounded="2" />
          </div>

        </div>

      </div>
    </div>
  );
}
