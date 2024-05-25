export default function GreenhouseSimulator() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-8/12 m-auto my-14">

        <p className="font-bold text-6xl text-center mb-8">Greenhouse Simulator</p>

        <video 
          src="/greenhouse-simulator-demo.mp4" 
          alt="Greenhouse Simulator Demo"
          className="h-auto w-9/12 white-box-shadow rounded-xl my-8"
          controls 
          autoPlay
          loop
          muted
        >
            Your browser does not support videos.
        </video>

        <p className="text-lg mt-4 w-8/12">
          This greenhouse simulator is a Java application designed to replicate the environmental conditions within a 
          greenhouse. Utilizing multithreading, the simulator can concurrently manage and simulate three environmental 
          factors: temperature, humidity, and soil moisture.
        </p>

      </div>
    </div>
  );
}
