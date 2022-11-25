/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState, useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./main.module.css";

export default function ViewBidMain() {
  const [bids, setBids] = useState(true);

  const [Store] = useContext(StoreContext);

  const allBidArchitect = Store.allBidArchitect;

  const viewDetailsClick = (id) => {
    window.location.href = `/view-bid/${id}`;
  };

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
            <span className={styles.number}>{allBidArchitect?.length}</span>
          </div>
          <div className={styles.bidCard__container}>
            {allBidArchitect
              ?.slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <>
                    {item?.bid ? (
                      <>
                        <div key={index} className={styles.bid__projectCard}>
                          <div className={styles.bid__projectCard__top}>
                            <img
                              src={
                                item?.thumbnail
                                  ? item?.thumbnail
                                  : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                              }
                              alt=""
                            />
                            <div className={styles.bid__projectCard__title}>
                              <h5>{item?.project_name}</h5>
                              <p>{item?.project_type}</p>
                            </div>
                          </div>
                          <div
                            className={styles.bid__projectCard__button}
                            onClick={() => viewDetailsClick(item?._id)}
                          >
                            View details
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
