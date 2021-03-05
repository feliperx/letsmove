import { createContext, ReactNode, useContext, useEffect, useState } from 'react'; 
import {ChallengeContext} from '../contexts/ChallengeContext';

interface CountdownContextData {
    minutes: number; 
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;

} 

interface CountdownProviderProps {
    children: ReactNode;
} 

export const CountdownContext = createContext ({} as CountdownContextData); 

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps) {

    const {startNewChallenge} = useContext(ChallengeContext);

    const [time, setTime] = useState(30 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60); //arredondando para menos
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
      }
    
      function resetCountdown() {
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime(30 * 60);
        setHasFinished(false);
      }
    
      useEffect(() => {
        if (isActive && time > 0) {
          countdownTimeout = setTimeout(() => {
            setTime(time - 1);
          }, 1000);
        } else if (isActive && time === 0) {
          setIsActive(false);
          setHasFinished(true);
          startNewChallenge();
        }
      }, [isActive, time]);

    return(
        <CountdownContext.Provider 
        value={{
            minutes,
            seconds, 
            hasFinished, 
            isActive, 
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}