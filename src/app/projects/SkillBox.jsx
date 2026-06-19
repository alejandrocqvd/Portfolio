import Image from "next/image";

// ==============================================================================================================
function getRoundedClass(rounded) {
  if (rounded === 1) return "rounded-l-lg";
  if (rounded === 2) return "rounded-r-lg";
  return "";
}

// ==============================================================================================================
export default function SkillBox({
  name,
  image,
  bgColour,
  rounded,
}) {
  const roundedClass = getRoundedClass(rounded);

  return (
    <div
      className={`skill-box h-12 w-full ${bgColour} ${roundedClass}`}
    >
      <div className="blur-container flex items-center justify-center h-full w-full">
        <Image
          src={image}
          alt={name}
          width={32}
          height={32}
          className="skill-image object-contain"
        />
      </div>

      <p className="skill-text font-normal xl:font-medium text-sm xl:text-md drop-shadow-2xl">
        {name}
      </p>
    </div>
  );
}
