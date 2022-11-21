import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";

const ProjectHeader = () => {
  return (
    <div className={styles.headerDash}>
      <div className={styles.left__headerDash}>
        <Link href="/dashboard" passHref>
          <Image
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={80}
          />
        </Link>
      </div>
      <div className={styles.right__headerDash}>
        <div className={styles.left__right__headerDash}>
          <h2>Project Details</h2>
        </div>
        <div className={styles.right__right__headerDash}></div>
      </div>
    </div>
  );
};

export default ProjectHeader;
