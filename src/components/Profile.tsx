import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {

  const {level} = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://e7.pngegg.com/pngimages/286/70/png-clipart-rick-sanchez-morty-smith-pocket-mortys-rick-morty.png" />
      <div>
        <strong>Rick Sanchez</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
