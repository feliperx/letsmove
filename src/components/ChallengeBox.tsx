import styles from "../styles/components/ChallengeBox.module.css"; 

import {ChallengeContext} from '../contexts/ChallengeContext'
import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

export function ChallengeBox() {
  const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext); 
  const {resetCountdown} = useContext(CountdownContext);

  function handleChallengeFailed(){
    resetChallenge(); 
    resetCountdown();
  }

  function handleChallengeCheck(){
    completeChallenge(); 
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}> 
            <header>Ganhe {activeChallenge.amount} xp</header> 

            <main>
                <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                <strong>Novo desafio</strong>
                <p>{activeChallenge.description}</p>
            </main> 

            <footer>
                <button type="button" className={styles.buttonChallengeFail} onClick={handleChallengeFailed}>Falhei :(</button>
                <button type="button" className={styles.buttonChallengeCheck} onClick={handleChallengeCheck}>Completei (:</button>
            </footer>

        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo e receba desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Complete os desafios para ganhar xp
          </p>
        </div>
      )}
    </div>
  );
}
