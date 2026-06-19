import Image from "next/image";

export const SkillBox = ({ name, image, bgColour, rounded }) => {
  return (
    <div className={`skill-box h-12 w-full ${bgColour} ${rounded === 1 ? "rounded-l-lg" : rounded === 2 ? "rounded-r-lg" : ""}`}>
      <div className="blur-container flex items-center justify-center h-full w-full">
        <Image
          src={image}
          alt={name}
          width={32}
          height={32}
          className="skill-image object-contain"
        />
      </div>
      <p className="skill-text font-normal xl:font-medium text-sm xl:text-md drop-shadow-2xl">{name}</p>
    </div>
  );
};
