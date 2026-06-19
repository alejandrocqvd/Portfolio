export const MiniSkillBox = (props) => {
    const { skillName, skillImage, bgColour, rounded } = props;

    // Handle C# case, and Meta SDK case
    let newName = skillImage
    if (skillImage === "/skills/c#-logo.png") {
      newName = "/skills/cs-logo.png";
    } else if (skillImage === "/skills/meta xr sdk-logo.png") {
      newName = "/skills/meta-xr-sdk-logo.png";
    } else {
      newName = skillImage;
    }
    
    return (
      <div className={`py-1 bg-[#242327] ${rounded == 1 ? "rounded-l-lg" : (rounded == 2 ? "rounded-r-lg" : "") }`}>
        <div className={`mini-skill-box h-6 xl:h-8 w-12`}>
          <div className="no-blur-container">
            <img className="skill-image h-full w-full" src={newName} alt={skillName} />
          </div>
          {/* <p className="skill-text font-normal xl:font-bold text-sm xl:text-md drop-shadow-2xl">{skillName}</p> */}
        </div>
      </div>
    );
  }