import styles from "../styles/components/Countdown.module.css";
import { useState, useEffect, useContext } from "react";
import {ChallengeContext} from '../contexts/ChallengeContext'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const {startNewChallenge} = useContext(ChallengeContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); //arredondando para menos
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");


  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
    setTime(0.05 * 60);
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

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <div>
        {hasFinished ? (
          <button 
          disabled 
          className={styles.countdownButton}>
            Ciclo Encerrado
          </button>
        ) : (
          <> {/*Fragment*/}            
            {isActive ? (
              <button
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar Ciclo
                <img src="icons/close.svg" alt="Reset" />
              </button>
            ) : (
              <button
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar Ciclo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
