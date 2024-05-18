export default function ContactSection() {
  return (
    <>
        <div id="contact"></div>
        <div className="flex flex-col w-full justify-center items-center bg-[#242327]">
            <div className="w-8/12 pt-14 mb-6 px-16">
            <div className="flex flex-row w-full justify-center items-start mb-14">
                <p className="text-4xl font-bold flex-1">Get in touch</p>
                <div>
                <div className="flex flex-col text-2xl font-medium text-right">
                    <p>alejandrocqvd@gmail.com</p>
                    <a href="" target="_blank" className="mt-4 hover-underline w-auto hover:text-[#666666]">CV</a>
                    <a href="https://github.com/alejandrocqvd" target="_blank" className="mt-4 hover:text-[#666666]">Github</a>
                    <a href="https://www.linkedin.com/in/alejandro-cardona-023282264" target="_blank" className="mt-4 hover:text-[#666666]">LinkedIn</a>
                    <a href="https://www.instagram.com/alejandrocqvd/" target="_blank" className="mt-4 hover:text-[#666666]">Instagram</a> 
                </div>
                </div>
            </div>
            <p className="text-center">Designed and Developed by Alejandro Cardona</p>
            </div>
      </div>
    </>
  );
}
