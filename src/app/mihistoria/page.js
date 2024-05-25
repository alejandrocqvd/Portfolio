export default function MiHistoria() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-8/12 m-auto my-14">

        <h1 className="font-bold text-6xl text-center mb-8 bg-clip-text text-transparent bg-gradient">MiHistoria</h1>

        <div className="flex flex-row justify-center items-center">
          <a 
            href="https://github.com/alejandrocqvd/MiHistoria" 
            target="_blank" 
            className="flex flex-row justify-between items-center w-32 shadow-md rounded-xl px-4 py-2 mr-3 hover:opacity-70"
          >
            <p className="text-lg">GitHub</p>
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
            <p className="text-lg">Website</p>
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
          className="h-auto w-9/12 white-box-shadow rounded-xl my-8"
          controls 
          autoPlay
          loop
          muted
        >
            Your browser does not support videos.
        </video>

        <p className="text-lg mt-4 w-8/12">
          MiHistoria is a social media web application I designed and developed to continue developing the skills I learnt from working on DinoDB. 
          On MiHistoria, each user gets one, and only one post, and in that post they write their life story. Here, users can like, comment on, and 
          save others&apos; stories, fostering a sense of community and engagement. Additionally, users have the option to write their stories anonymously or publicly, 
          providing flexibility and privacy as desired.
        </p>

      </div>
    </div>
  );
}
