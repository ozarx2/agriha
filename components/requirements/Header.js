/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header_outer}>
        <div className={styles.header_inner}>
          <div className={styles.header__left}>
            <img src="/img/landing/logo.svg" alt="logo" />
            <div className={styles.navLinks}>
              <p className={styles.active}>For You</p>
              <p>Projects</p>
              <p>Architects</p>
            </div>
          </div>
          <div className={styles.header__right}>
            <div className={styles.architect}>Are you an Architect ?</div>
            <div className={styles.loginButton}>User Login</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
