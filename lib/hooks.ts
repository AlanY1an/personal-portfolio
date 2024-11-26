import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from '@/lib/types'

export default function useSectionInView(
  sectionName:SectionName,
  threshold = 0.75
){ 
  const {ref, inView} = useInView({
    threshold:threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  
  useEffect(()=>{
    if(inView && Date.now() - timeOfLastClick > 1000){
      console.log(`You are in ${sectionName} section`);
      setActiveSection(sectionName);
    }
  },[inView, setActiveSection, sectionName, timeOfLastClick]);
  return {
    ref,
  };
}