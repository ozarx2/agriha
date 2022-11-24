import React from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";

import styles from "./single-main.module.css";

export default function SingleProjectsMain() {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;

  const acceptClick = () => {
    setBidDataPopup(true);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>Enter Project name</div>
          <div className={styles.results__container}>
            <div className={styles.resultSection}>
              <p>Project type</p>
              <div className={styles.resultTextContainer}>Apartment</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project name</p>
              <div className={styles.resultTextContainer}>
                Luxury Appartment
              </div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected area of project</p>
              <div className={styles.resultTextContainer}>6000 SQFT</div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected Budget of project</p>
              <div className={styles.resultTextContainer}>₹ 70,000,00</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project size</p>
              <div className={styles.resultTextContainer}>2 BHK</div>
            </div>
            <div className={styles.resultSection}>
              <p>03 floor</p>
              <div className={styles.resultTextContainer}>Number of floors</div>
            </div>
            <div className={styles.resultSection}>
              <p>Number of unit</p>
              <div className={styles.resultTextContainer}>07 unit</div>
            </div>
          </div>
          <div className={styles.buttons__container}>
            <div className={styles.decline_button}>Decline</div>
            <div className={styles.accept_button} onClick={acceptClick}>
              Accept
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
