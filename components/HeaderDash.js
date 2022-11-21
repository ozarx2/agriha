import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";

const HeaderDash = () => {
  const newProject = () => {
    window.location.href = "/Selectproject";
  };

  return (
    <div className={styles.headerDash}>
      <div className={styles.left__headerDash}>
        <Link href="/dashboard" passHref>
          <Image
            src="/agrihaLogo2.png"
            alt="agriha_Logo"
            width={100}
            height={40}
          />
        </Link>
      </div>
      <div className={styles.right__headerDash}>
        <div className={styles.left__right__headerDash}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.right__right__headerDash}>
          <div onClick={newProject} className={styles.createProject__button}>
            <Image src="/plusIcon.svg" alt="" width={12} height={12} />
            <p>New Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDash;
