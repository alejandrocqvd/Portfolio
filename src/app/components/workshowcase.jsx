export default function WorkShowcase(props) {
  const { title, subtitle, description, techStack, image, reversed } = props;

  return (
    <div className={`flex ${ reversed ? "flex-row-reverse" : "flex-row"} w-full justify-center items-center mb-52`}>
      <img src={image} alt={title} className={`flex-1 h-72 w-auto object-cover white-box-shadow ${ reversed ? "md:ml-8" : "md:mr-8"}`}/>
      <div className={`flex flex-col flex-1 h-full justify-center text-xl ${ reversed ? "md:mr-8" : "md:ml-8"}`}>
        <p className="text-5xl font-bold mb-2">{title}</p>
        <p>{subtitle}<br></br><br></br></p>
        <p><span className="font-bold">GOAL: </span>{description}<br></br><br></br></p>
        <p><span className="font-bold">TECH STACK: </span>{techStack}</p>
      </div>
    </div>
  );
}
