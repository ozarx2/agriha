import React from "react";
import Image from "next/image";
import styles from "../styles/cardNav.module.css";

function Cardnav({ title, description }) {
  return (
    <div className={styles.cardNav}>
      <div className={styles.cardNav__left}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.cardNav__right}>
        <Image alt="" src="/agrihaLogo.png" width={90} height={35} />
      </div>
    </div>
  );
}

export default Cardnav;
