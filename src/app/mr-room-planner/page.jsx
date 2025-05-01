import { SkillBox } from "@/components/ui/SkillBox";

export default function MRRoomPlanner() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-9/12 md:w-8/12 m-auto my-14">

        <h1 className="font-bold text-4xl md:text-6xl text-center mb-8 font-mono">IDEA MR Room Planner</h1>

        <div className="flex flex-row justify-center items-center">
          <a 
            href="https://github.com/alejandrocqvd/IDEA-MR-Room-Planner" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 mr-3 hover:opacity-70"
          >
            <p className="text-md md:text-lg">GitHub</p>
            <img 
              src="/skills/github-logo.png" 
              alt="GitHub logo" 
              className="h-6 w-auto object-cover" 
            />
          </a>
        </div>

        <video 
          src="/misc/IDEA_MR_Room_Planner_Demo.mp4" 
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
          <p className="text-4xl font-bold my-4 text-center">What Is It?</p>
          <p>
          Using Unity 6 and Meta&apos;s XR SDK, I developed a mixed reality app for the Quest 3 that allows users to visualize 
          and customize their living spaces with life-sized 3D furniture models, in real time. The app features hand 
          tracking, giving users the freedom to grab, move, and arrange furniture as they would naturally, without the need 
          for controllers. Users can grab the virtual catalogue panel to view a selection of over 100+ unique pieces, 
          including armchairs, desks, drawers, lamps, bookcases, and sofas. This mixed reality experience offers a new way 
          to explore interior design, making it more intuitive in a natural, hands-on way.
            <br></br><br></br> Essentially, users can:
          </p>

          <ul className="list-disc list-inside mt-6">
            <li className="md:ml-6 mb-4">
              Visualize their room with 100+ unique furniture pieces.
            </li>
            <li className="md:ml-6 mb-4">
              Interact with virtual furniture using their hands.
            </li>
            <li className="md:ml-6 mb-4">
              Explore virtual interior design in a more natural way.
            </li>
          </ul>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Project Goals</p>
          <p>
            I&apos;ve always been hugely interested in VR and MR, and once I got my hands on a Quest 3, I 
            knew I had to do something with it (aside from playing games on it). With this being my first 
            mixed reality project, I wanted to start off doing something relatively simple, and this project 
            was exactly that. It allowed me to step into the world of Game Engines and MR development using 
            Unity and Meta&apos;s XR SDK to explore and play around with mixed reality development.
            <br></br><br></br>
            My interest in mixed reality has only increased after this project, and I hope in the future I can 
            develop more interesting and complex ideas in this field.
          </p>

          <p className="text-4xl font-bold mt-12 mb-6 text-center">Tech Stack</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4">
            <SkillBox skillName="C#" skillImage="/skills/cs-logo.png" bgColour="bg-[#242327]" rounded="1" />
            <SkillBox skillName="Meta XR SDK" skillImage="/skills/meta-xr-sdk-logo.png" bgColour="bg-[#242327]" rounded="0" />
            <SkillBox skillName="Unity" skillImage="/skills/unity-logo.png" bgColour="bg-[#242327]" rounded="2" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
