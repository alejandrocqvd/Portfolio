"use client"
import { useInView } from "react-intersection-observer";

export default function Languages() {
    const { ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.2,
        });

    return (
        <div ref={ref} className="row flex flex-row flex-nowrap content-center h-auto w-full mb-12 px-8">
            <SkillBox skillName="Python" skillImage="/python-logo.png" bgColour="bg-[#8a650c]" rounded="1" />
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#a78214]" rounded="0" />
            <SkillBox skillName="JavaScript" skillImage="/javascript-logo.png" bgColour="bg-[#b69219]" rounded="0" />
            <SkillBox skillName="HTML" skillImage="/html-logo.png" bgColour="bg-[#c5a21e]" rounded="0" />
            <SkillBox skillName="CSS" skillImage="/css-logo.png" bgColour="bg-[#d3b022]" rounded="0" />
            <SkillBox skillName="TypeScript" skillImage="/typescript-logo.png" bgColour="bg-[#e1bf26]" rounded="0" />
            <SkillBox skillName="C" skillImage="/c-logo.png" bgColour="bg-[#efcd2b]" rounded="0" />
            <SkillBox skillName="Assembly" skillImage="/assembly-logo.png" bgColour="bg-[#ffde30]" rounded="2" />
        </div>
  );
}
