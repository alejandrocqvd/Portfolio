export default function SkillBox(props) {
  const { skillName, skillImage, bgColour, rounded } = props;
  
  return (
    <div className={`skill-box h-12 xl:h-16 w-full ${bgColour} ${rounded == 1 ? "rounded-l-lg" : (rounded == 2 ? "rounded-r-lg" : "") }`}>
      <div className="blur-container">
        <img className="skill-image h-full w-full" src={skillImage} alt={skillName} />
      </div>
      <p className="skill-text font-normal xl:font-bold text-sm xl:text-md drop-shadow-2xl">{skillName}</p>
    </div>
  );
}
