import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const HeaderServices = () => {
  const [page, setPage] = useState("");

  useEffect(() => {
    localStorage.setItem("page", "services");
    var pageName = localStorage.getItem("page");
    console.log(pageName);
  }, []);

  const menuClick = () => {
    document.getElementById("header__mobile_container").style.height = "290px";
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
      <div className={styles.headerMainServices}>
        <div className={styles.header__left}>
          <Link href="/" passHref>
            <Image
              className={styles.header__logo}
              src="/agrihaLogo.svg"
              alt="agriha Logo"
              width={120}
              height={100}
            />
          </Link>
        </div>
        <div className={styles.header__right__main}>
          <nav className={styles.nav__header__main}>
            <ul>
              <li>
                <Link href="/" passHref>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/view-services" passHref>
                  <p className={styles.home__nav__header__main}>Our Services</p>
                </Link>
              </li>
              <li>
                <Link href="/" passHref>
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <p>How It Works</p>
                </Link>
              </li>
            </ul>
          </nav>
          <a
            href="#contact"
            id="contactButton"
            className={styles.contactButton__header__services}
          >
            <div id="callWhite" className={styles.callWhiteServices}>
              <Image
                className={styles.header__menu}
                src="/callIconMain.svg"
                alt=""
                width={14}
                height={14}
              />
            </div>
            <div id="callBlack" className={styles.callBlackServices}>
              <Image
                className={styles.header__menu}
                src="/callIconMainBlack.svg"
                alt=""
                width={20}
                height={20}
              />
            </div>
            Contact Us
          </a>
        </div>
        <div className={styles.header__right__main__mobile}>
          <div className={styles.menuIcon}>
            <Image src="/menuIcon2.svg" alt="" width={25} height={25} />
          </div>
        </div>
      </div>

      <div
        id="header__mobile_container"
        className={styles.header__mobile_container__services}
      >
        <div className={styles.header__mobile}>
          <div className={styles.header__left}>
            <Link href="/" passHref>
              <Image
                className={styles.header__logo}
                src="/AgrihaLogo3.svg"
                alt="agriha Logo"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <div className={styles.header__right}>
            <a href="tel:9995111325" className={styles.callButton__header}>
              <Image
                className={styles.header__menu}
                src="/callIcon.svg"
                alt=""
                width={30}
                height={20}
              />
            </a>
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
                height={20}
              />
            </div>
          </div>
        </div>
        <div
          id="header__nav_mobile"
          className={styles.header__nav_mobile__main}
        >
          <div className={styles.header__nav_link__main}>
            <Link href="/" passHref>
              <p>Home</p>
            </Link>
          </div>
          <div className={styles.header__nav_link__main}>
            <Link href="/view-services" passHref>
              <p>Our Services</p>
            </Link>
          </div>
          <div className={styles.header__nav_link__main}>
            <a href="#">How It Works</a>
          </div>
          <div className={styles.header__nav_link__main}>
            <a href="#">About Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderServices;
