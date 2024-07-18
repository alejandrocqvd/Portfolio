export default function ContactSection() {
  return (
    <>
        <div id="contact"></div>
        <div className="flex flex-col w-screen md:w-full justify-center items-center bg-[#242327]">
            <div className="w-9/12 md:w-8/12 pt-14 mb-6 md:px-16">
            <div className="flex flex-col md:flex-row w-full justify-center items-center md:items-start mb-14">
              <p className="text-3xl md:text-4xl font-bold flex-1 text-center md:text-left mb-8 md:mb-0">Get in touch</p>
              <div>
                <div className="flex flex-col text-md md:text-2xl font-medium text-center md:text-right">
                    <p>alejandrocqvd@gmail.com</p>
                    <a href="/Alejandro-Cardona-Resume.pdf" target="_blank" className="mt-4 hover-underline w-auto hover:text-[#666666]">CV</a>
                    <a href="https://github.com/alejandrocqvd" target="_blank" className="mt-4 hover:text-[#666666]">Github</a>
                    <a href="https://www.linkedin.com/in/alejandro-cardona-023282264" target="_blank" className="mt-4 hover:text-[#666666]">LinkedIn</a>
                    <a href="https://www.instagram.com/arepandro/" target="_blank" className="mt-4 hover:text-[#666666]">Instagram</a> 
                </div>
              </div>
            </div>
            <p className="text-sm md:text-lg text-center">Designed and Developed by Alejandro Cardona</p>
            </div>
      </div>
    </>
  );
}
