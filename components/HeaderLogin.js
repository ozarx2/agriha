import React from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";

const HeaderLogin = () => {
  const menuClick = () => {
    document.getElementById("header__mobile_container").style.height = "250px";
    document.getElementById("header__nav_mobile").style.display = "flex";
    document.getElementById("menuIcon").style.display = "none";
    document.getElementById("closeIcon").style.display = "block";
  };
  const closeClick = () => {
    document.getElementById("header__mobile_container").style.height = "70px";
    document.getElementById("header__nav_mobile").style.display = "none";
    document.getElementById("menuIcon").style.display = "block";
    document.getElementById("closeIcon").style.display = "none";
  };
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Image
            className={styles.header__logo}
            src="/agrihaLogo2.png"
            alt="agriha_Logo"
            width={120}
            height={100}
          />
        </div>
        <div className={styles.header__right}>
          <nav className={styles.header__nav}>
            <ul>
              <li>
                <Link href="/profile">Personal Details</Link>
              </li>
              <li>
                <Link href="/profilePlan">Plan Details</Link>
              </li>
              <li>
                <Link href="/drive">Document Drive</Link>
              </li>
              <li>
                <Link href="/purchaseDetails">Purchase Details</Link>
              </li>
            </ul>
          </nav>
          <Link href="/sendotp" passHref>
            <p className={styles.loginButton__header}>LOG OUT</p>
          </Link>
        </div>
      </div>

      <div
        id="header__mobile_container"
        className={styles.header__mobile_container}
      >
        <div className={styles.header__mobile}>
          <div className={styles.header__left}>
            <Link href="/" passHref>
              <Image
                className={styles.header__logo}
                src="/arclifLogo.png"
                alt="Arclif Logo"
                width={120}
                height={40}
              />
            </Link>{" "}
            <div className={styles.header__logo_one}>
              <Image src="/one.png" alt="" width={2} height={25} />
            </div>
            <Image
              className={styles.header__logo}
              src="/agrihaLogo.png"
              alt="agriha Logo"
              width={110}
              height={90}
            />
          </div>
          <div className={styles.header__right}>
            <Link href="/sendotp" passHref>
              <p className={styles.loginButton__header}>LOG OUT</p>
            </Link>
            <div
              id="menuIcon"
              onClick={menuClick}
              className={styles.header__menu__container}
            >
              <Image
                className={styles.header__menu}
                src="/menuIcon.svg"
                alt=""
                width={30}
                height={20}
              />
            </div>
            <div
              id="closeIcon"
              onClick={closeClick}
              className={styles.header__menu__container__close}
            >
              <Image
                className={styles.header__menu}
                src="/closeIcon.svg"
                alt=""
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
        <div id="header__nav_mobile" className={styles.header__nav_mobile}>
          <div className={styles.header__nav_link}>
            <Link href="/profile">Personal Details</Link>
          </div>
          <div className={styles.header__nav_link}>
            <Link href="/profilePlan">Plan Details</Link>
          </div>
          <div className={styles.header__nav_link}>
            <Link href="/drive">Document Drive</Link>
          </div>
          <div className={styles.header__nav_link}>
            <Link href="/purchaseDetails">Purchase Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogin;
