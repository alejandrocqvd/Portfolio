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
    <div className={`flex ${reversed ? "xl:flex-row-reverse" : "xl:flex-row"} w-full flex-col justify-center items-center mb-24 xl:mb-32`}>
      <img src={image} alt={title} className={`xl:flex-1 h-36 xl:h-72 w-auto m-auto mb-10 xl:mb-0 object-cover white-box-shadow ${reversed ? "xl:ml-8" : "xl:mr-8"}`} />
      <div className={`flex flex-col xl:flex-1 h-full justify-center text-md xl:text-lg ${reversed ? "xl:mr-8" : "xl:ml-8"}`}>
        {link && !page ? (
          <a href={link} target="_blank"><p className="text-2xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p></a>
        ) : (
          <p className="text-2xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p>
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
