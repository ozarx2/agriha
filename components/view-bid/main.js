/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState, useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./main.module.css";

export default function ViewBidMain() {
  const [bids, setBids] = useState(true);

  const [Store] = useContext(StoreContext);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main__inner}>
          <div className={styles.title}>
            Bid View
            <span className={styles.dot}>
              <Image
                src="/img/architect-dashboard/dot.svg"
                alt="dot"
                width={3}
                height={3}
              />
            </span>
            <span className={styles.number}>4</span>
          </div>
          <div className={styles.bidCard__container}>
            <div className={styles.bid__projectCard}>
              <div className={styles.bid__projectCard__top}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBmzMOVh-ZPepjH8lBljYRKI7KKmII2smC8akphenxaWS9K6WWuVX61JtUFugGDxEPeY&usqp=CAU"
                  alt=""
                />
                <div className={styles.bid__projectCard__title}>
                  <h5>Enter Project name</h5>
                  <p>project location</p>
                </div>
              </div>
              <div className={styles.bid__projectCard__button}>
                View details
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
