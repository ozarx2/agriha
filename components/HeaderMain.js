import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const HeaderMain = () => {
  const [page, setPage] = useState("");

  useEffect(() => {
    localStorage.setItem("page", "home");
    var pageName = localStorage.getItem("page");
    setPage(pageName);
    console.log(pageName);
  }, []);

  const scrollSettings = () => {
    if (page === "home") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
          document.getElementById("headerMain").style.backgroundColor =
            "#ffffff";
          document.getElementById("contactButton").style.borderColor =
            "#000000";
          document.getElementById("contactButton").style.color = "#000000";
          document.getElementById("callBlack").style.display = "block";
          document.getElementById("callWhite").style.display = "none";
          document.getElementById("headerMain").style.borderBottom =
            "1px solid #f2f2f2";
        } else {
          document.getElementById("headerMain").style.background =
            "transparent";
          document.getElementById("contactButton").style.borderColor =
            "#ffffff";
          document.getElementById("contactButton").style.color = "#ffffff";
          document.getElementById("callBlack").style.display = "none";
          document.getElementById("callWhite").style.display = "block";
          document.getElementById("headerMain").style.border = "none";
        }
        if (window.scrollY > 100) {
          document.getElementById("headerMain").style.backgroundColor =
            "#ffffff";
          document.getElementById("contactButton").style.borderColor =
            "#000000";
          document.getElementById("contactButton").style.color = "#000000";
          document.getElementById("callBlack").style.display = "block";
          document.getElementById("callWhite").style.display = "none";
          document.getElementById("headerMain").style.borderBottom =
            "1px solid #f2f2f2";
          document.getElementById(
            "header__mobile_container"
          ).style.backgroundColor = "#0E263D";
          document.getElementById("header__mobile_container").style.height =
            "70px";
          document.getElementById("menuIcon").style.display = "block";
          document.getElementById("closeIcon").style.display = "none";

          document.getElementById("contactButton").onmouseover = function () {
            document.getElementById("contactButton").style.color = "#ffffff";
            document.getElementById("callBlack").style.display = "none";
            document.getElementById("callWhite").style.display = "block";
          };

          document.getElementById("contactButton").onmouseleave = function () {
            document.getElementById("contactButton").style.color = "#000000";
            document.getElementById("callBlack").style.display = "block";
            document.getElementById("callWhite").style.display = "none";
          };
        } else {
          document.getElementById("headerMain").style.background =
            "transparent";
          document.getElementById("contactButton").style.borderColor =
            "#ffffff";
          document.getElementById("contactButton").onmouseleave = function () {
            document.getElementById("contactButton").style.color = "#ffffff";
            document.getElementById("callBlack").style.display = "none";
            document.getElementById("callWhite").style.display = "block";
          };
          document.getElementById("contactButton").style.color = "#ffffff";
          document.getElementById("callBlack").style.display = "none";
          document.getElementById("callWhite").style.display = "block";
          document.getElementById("header__mobile_container").style.background =
            "transparent";
        }
        document.getElementById("header__nav_mobile").style.display = "none";
      });
    }
  };

  useEffect(() => {
    if (page !== "") {
      scrollSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const menuClick = () => {
    document.getElementById("header__mobile_container").style.height = "290px";
    document.getElementById("header__nav_mobile").style.display = "flex";
    document.getElementById("menuIcon").style.display = "none";
    document.getElementById("closeIcon").style.display = "block";
    document.getElementById("header__mobile_container").style.backgroundColor =
      "#0E263D";
  };
  const closeClick = () => {
    document.getElementById("header__mobile_container").style.height = "70px";
    document.getElementById("header__nav_mobile").style.display = "none";
    document.getElementById("menuIcon").style.display = "block";
    document.getElementById("closeIcon").style.display = "none";
    if (!window.scrollY > 500) {
      document.getElementById("header__mobile_container").style.background =
        "transparent";
    }
  };

  return (
    <div>
      <div id="headerMain" className={styles.headerMain}>
        <div className={styles.header__left}>
          <Link href="/" passHref>
            <Image
              className={styles.header__logo}
              src="/agrihaLogo2.png"
              alt="agriha Logo"
              width={110}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.header__right__main}>
          <nav className={styles.nav__header__main}>
            <ul>
              <li>
                <Link href="/" passHref>
                  <p className={styles.home__nav__header__main}>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/view-services" passHref>
                  <p>Our Services</p>
                </Link>
              </li>
              <li>
                <a href="#howItWorks">How It Works</a>
              </li>
              <li>
                <a href="#aboutUs">About Us</a>
              </li>
            </ul>
          </nav>
          <a
            href="#contact"
            id="contactButton"
            className={styles.contactButton__header}
          >
            <div id="callWhite">
              <Image
                className={styles.header__menu}
                src="/callIconMain.svg"
                alt=""
                width={14}
                height={14}
              />
            </div>
            <div className={styles.callBlack} id="callBlack">
              <Image
                className={styles.header__menu}
                src="/callBlack.svg"
                alt=""
                width={14}
                height={14}
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
        className={styles.header__mobile_container__main}
      >
        <div className={styles.header__mobile}>
          <div className={styles.header__left}>
            <Link href="/" passHref>
              <Image
                className={styles.header__logo}
                src="/agrihaLogo2.png"
                alt="agriha Logo"
                width={100}
                height={35}
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
            <a href="#howItWorks">How It Works</a>
          </div>
          <div className={styles.header__nav_link__main}>
            <a href="#aboutUs">About Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
