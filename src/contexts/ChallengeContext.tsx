import React, { createContext, useState, ReactNode, useEffect } from "react"; 
import Cookies from 'js-cookie'; // '$yarn add @types/js-cookie -D' > Para add types

import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

//Boas Praticas TypeScript
interface ChallengeProviderProps {
  children: ReactNode; //tipagem para quando um Component recebe outro Component
  level: number; 
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  isLevelUpModelOpen: boolean;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void; 
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null); 

  //xp baseado em RPGs 
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); 

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, 
  [level, currentExperience, challengesCompleted])
  
  useEffect(() => {
    Notification.requestPermission();
  }, 
  []) // segundo paramentro array vazio = executa 1 vez quando o componente eh carregado 

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModelOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModelOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge); 

    new Audio('/notification.mp3').play(); //Audio no browser

    //Notificacao no Browser (API Notification)
    if (Notification.permission === "granted") {
      new Notification('Novo Desafio :)', {
        body: `Valendo ${challenge.amount}xp`
      })
    }

  }

  function resetChallenge(){
      setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge) {
      return; //validator
    }

    const {amount} = activeChallenge; 
    let finalExperience = currentExperience + amount ; 

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel; 
      levelUp(); 
    }

     setCurrentExperience(finalExperience); 
     setActiveChallenge(null); 
     setChallengesCompleted(challengesCompleted + 1);

  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        isLevelUpModelOpen,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModelOpen && <LevelUpModal/>}
    </ChallengeContext.Provider>
  );
}
