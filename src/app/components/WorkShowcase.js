"use client"
import { useInView } from "react-intersection-observer";

export default function WorkShowcase(props) {
  const { title, subtitle, description, techStack, image, reversed, link } = props;

  const { ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className={inView ? 'section-visible' : 'section-hidden'}>
      <div className={`flex ${ reversed ? "flex-row-reverse" : "flex-row"} w-full justify-center items-center mb-32`}>
        <img src={image} alt={title} className={`flex-1 h-72 w-auto m-auto object-cover white-box-shadow ${ reversed ? "md:ml-8" : "md:mr-8"}`}/>
        <div className={`flex flex-col flex-1 h-full justify-center text-lg ${ reversed ? "md:mr-8" : "md:ml-8"}`}>
          { link ? <a href={link} target="_blank" className="text-4xl font-bold mb-2 hover:underline">{title}</a> : <p className="text-4xl font-bold mb-2">{title}</p>}
          <p>{subtitle}<br></br><br></br></p>
          <p><span className="font-bold">GOAL: </span>{description}<br></br><br></br></p>
          <p><span className="font-bold">TECH STACK: </span>{techStack}</p>
        </div>
      </div>
    </section>
  );
}
