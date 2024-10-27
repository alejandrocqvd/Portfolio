/* eslint-disable @next/next/no-img-element */
"use client"
import { useInView } from "react-intersection-observer";
import Link from 'next/link';

export default function WorkShowcase(props) {
  const { title, subtitle, description, techStack, image, reversed, link, page } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const sectionContent = (
    <div className={`flex ${reversed ? "md:flex-row-reverse" : "md:flex-row"} w-full flex-col justify-center items-center mb-24 md:mb-32`}>
      <div className="flex md:flex-1 justify-center items-center">
        <img src={image} alt={title} className={`h-auto md:h-72 w-full md:w-auto m-auto mb-10 md:mb-0 object-cover white-box-shadow ${reversed ? "md:ml-8" : "md:mr-8"}`} />
      </div>
      <div className={`flex flex-col md:flex-1 h-full w-auto md:w-auto justify-center text-md xl:text-lg ${reversed ? "md:mr-8" : "md:ml-8"}`}>
        {link && !page ? (
          <a href={link} target="_blank"><p className="text-xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p></a>
        ) : (
          <p className="text-xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p>
        )}
        <p>{subtitle}<br /><br /></p>
        <p><span className="font-bold"></span>{description}<br /><br /></p>
        <p><span className="font-bold">TECH STACK: </span>{techStack}</p>
      </div>
    </div>
  );
  

  return (
    <section ref={ref} className={inView ? 'section-visible' : 'section-hidden'}>
      {page ? (
        <Link href={link} passHref>
          {sectionContent}
        </Link>
      ) : (
        sectionContent
      )}
    </section>
  );
}
