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
    <div className={`flex ${reversed ? "2xl:flex-row-reverse" : "2xl:flex-row"} w-full flex-col justify-center items-center mb-24 2xl:mb-32`}>
      <img src={image} alt={title} className={`2xl:flex-1 h-36 xl:h-72 w-auto m-auto mb-10 2xl:mb-0 object-cover white-box-shadow ${reversed ? "2xl:ml-8" : "2xl:mr-8"}`} />
      <div className={`flex flex-col 2xl:flex-1 h-full justify-center text-md 2xl:text-lg ${reversed ? "2xl:mr-8" : "2xl:ml-8"}`}>
        {link && !page ? (
          <a href={link} target="_blank"><p className="text-2xl 2xl:text-4xl font-bold mb-2 hover:underline">{title}</p></a>
        ) : (
          <p className="text-2xl 2xl:text-4xl font-bold mb-2 hover:underline">{title}</p>
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
