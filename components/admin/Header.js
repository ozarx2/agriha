/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <img
          className={styles.header__logo}
          src="/agrihaLogo2.png"
          alt="agriha Logo"
        />
      </div>
    </div>
  );
};

export default Header;
