import Image from "next/image";

// ==============================================================================================================
function getRoundedClass(index, count) {
  const first = index === 0 ? "rounded-l-control" : "";
  const last = index === count - 1 ? "rounded-r-control" : "";
  return `${first} ${last}`;
}

// ==============================================================================================================
// Steps the row from a faint to a stronger tint of the text colour, so it works in both themes.
function getShade(index, count) {
  const t = count > 1 ? index / (count - 1) : 0;
  return `rgb(var(--c-text) / ${(0.04 + t * 0.12).toFixed(3)})`;
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
