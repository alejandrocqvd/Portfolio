export default function ContactSection() {
  return (
    <>
        <div id="contact"></div>
        <div className="flex flex-col w-screen xl:w-full justify-center items-center bg-[#242327]">
            <div className="w-9/12 xl:w-8/12 pt-14 mb-6 xl:px-16">
            <div className="flex flex-col xl:flex-row w-full justify-center items-center xl:items-start mb-14">
              <p className="text-3xl xl:text-4xl font-bold flex-1 text-center xl:text-left mb-8 xl:mb-0">Get in touch</p>
              <div>
                <div className="flex flex-col text-md xl:text-2xl font-medium text-center xl:text-right">
                    <p>alejandrocqvd@gmail.com</p>
                    <a href="/Alejandro-Cardona-Resume.pdf" target="_blank" className="mt-4 hover-underline w-auto hover:text-[#666666]">CV</a>
                    <a href="https://github.com/alejandrocqvd" target="_blank" className="mt-4 hover:text-[#666666]">Github</a>
                    <a href="https://www.linkedin.com/in/alejandro-cardonaq" target="_blank" className="mt-4 hover:text-[#666666]">LinkedIn</a>
                    <a href="https://www.instagram.com/arepandro/" target="_blank" className="mt-4 hover:text-[#666666]">Instagram</a> 
                </div>
              </div>
            </div>
            <p className="text-sm xl:text-lg text-center">Designed and Developed by Alejandro Cardona</p>
            </div>
      </div>
    </>
  );
}
