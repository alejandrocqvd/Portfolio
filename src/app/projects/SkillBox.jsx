import Image from "next/image";

// ==============================================================================================================
function getRoundedClass(index, count) {
  const first = index === 0 ? "rounded-l-lg" : "";
  const last = index === count - 1 ? "rounded-r-lg" : "";
  return `${first} ${last}`;
}

// ==============================================================================================================
// Shades the row dark to light, #101010 for the first box to #454545 for the last.
function getShade(index, count) {
  const t = count > 1 ? index / (count - 1) : 0;
  const hex = Math.round(0x10 + t * (0x45 - 0x10))
    .toString(16)
    .padStart(2, "0");
  return `#${hex}${hex}${hex}`;
}

// ==============================================================================================================
export default function SkillBox({ name, image, index, count }) {
  return (
    <div
      className={`skill-box h-12 w-full ${getRoundedClass(index, count)}`}
      style={{ backgroundColor: getShade(index, count) }}
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
