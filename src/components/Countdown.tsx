import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {

  const {seconds, minutes, hasFinished, isActive, resetCountdown, startCountdown} = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split(""); 

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
          <button disabled className={styles.countdownButton}>
            Ciclo Encerrado
          </button>
        ) : (
          <>
            {" "}
            {/*Fragment*/}
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
