export default function DinoDB() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-8/12 m-auto my-14">

        <p className="font-bold text-6xl text-center mb-8">DinoDB</p>

        <div className="flex flex-row justify-center items-center">
          <a 
            href="https://github.com/e-woo/dinodb" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 hover:opacity-70"
          >
            <p className="text-lg">GitHub</p>
            <img 
              src="/github-logo.png" 
              alt="GitHub logo" 
              className="h-6 w-auto object-cover" 
            />
          </a>
        </div>

        <iframe 
          src="https://www.youtube.com/embed/t84lqLT7D94?autoplay=1&loop=1&mute=1" 
          className=" h-96 w-9/12 white-box-shadow rounded-xl my-8"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        >
        </iframe>

        <p className="text-lg mt-4 w-8/12">
          DinoDB is a comprehensive web application myself and two others developed for the CPSC-471 databases class at 
          the University of Calgary. It serves as a central hub for all extracurricular activities within UCalgary. DinoDB allows 
          students to join and register various volunteering opportunities, events, clubs, and programs. Executives can do everything 
          students can do, but more. Executives can create their own extracurricular activities and customize their page to their liking. 
          Furthermore, to promote their activities, executives can post announcements that are tied to their extracurricular.
        </p>

      </div>
    </div>
  );
}
