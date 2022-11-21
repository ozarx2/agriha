import React from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const HeaderSettings = () => {
  return (
    <div className={styles.headerDash}>
      <div className={styles.left__headerDash}>
          <Image
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={100}
          />
      </div>
      <div className={styles.right__headerDash}>
      </div>
    </div>
  );
};

export default HeaderSettings;
