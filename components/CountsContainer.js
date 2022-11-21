import React from "react";
import styles from "../styles/CountsContainer.module.css";
import Image from "next/image";

const CountsContainer = () => {
  return (
    <div className={styles.countsContainer}>
      <div className={styles.card__countsContainer}>
        <div className={styles.imageContainer__card__countsContainer}>
          <Image src="/rocketIcon.svg" alt="" width={100} height={100} />
        </div>
        <div className={styles.text__card__countsContainer}>
          <h3>200+</h3>
          <p>Projects Delivered</p>
        </div>
      </div>
      <div className={styles.card__countsContainer}>
        <div className={styles.imageContainer__card__countsContainer}>
          <Image src="/customersIcon.svg" alt="" width={100} height={100} />
        </div>
        <div className={styles.text__card__countsContainer}>
          <h3>300+</h3>
          <p>Happy Clients</p>
        </div>
      </div>
      <div className={styles.card__countsContainer}>
        <div className={styles.imageContainer__card__countsContainer}>
          <Image src="/reviewIcon.svg" alt="" width={100} height={100} />
        </div>
        <div className={styles.text__card__countsContainer}>
          <h3>200+</h3>
          <p>Client Review</p>
        </div>
      </div>
    </div>
  );
};

export default CountsContainer;
