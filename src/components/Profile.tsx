import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://e7.pngegg.com/pngimages/286/70/png-clipart-rick-sanchez-morty-smith-pocket-mortys-rick-morty.png" />
      <div>
        <strong>Rick Sanchez</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
