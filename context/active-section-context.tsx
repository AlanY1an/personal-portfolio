"use client"
import React,{ useState, createContext, useContext } from 'react'
import { SectionName } from '@/lib/types'

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  // Type of section name
  activeSection: SectionName,
  // Type of Set function
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>; 
  // Type of timeoflast click
  timeOfLastClick: number;
  // Type of timeoflast click set function
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider(
  {children}:ActiveSectionContextProviderProps
) {
  const [activeSection, setActiveSection] = useState<SectionName>('Home');

  // track the click
  const [timeOfLastClick,setTimeOfLastClick] = useState(0);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSectionContext(){
  const context = useContext(ActiveSectionContext);

  if (context === null){
    throw new Error(
      "useActiveSectionContect must be used whtin an ActiveSectionContect Provider"
    )
  }
  return context;
}