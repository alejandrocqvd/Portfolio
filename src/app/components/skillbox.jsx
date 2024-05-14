export default function SkillBox(props) {
  const { skillName, skillImage } = props;
  
  return (
    <div className="relative h-60 w-auto">
      <div className="absolute inset-0 z-10 hover:blur-md hover:z-20">
        <img className="w-full h-full object-cover" src={skillImage} alt={skillName} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <p className="text-white text-center">{skillName}</p>
      </div>
    </div>
  );
}
