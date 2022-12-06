/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./main.module.css";

export default function ViewBidMain() {
  const [bids, setBids] = useState(false);

  const [Store] = useContext(StoreContext);

  const allBidArchitect = Store.allBidArchitect;

  const viewDetailsClick = (id) => {
    window.location.href = `/view-bid/${id}`;
  };

  const temp = allBidArchitect.filter((val) => val.bid === true);
  const oldDate = new Date((Math.floor(+new Date() / 1000) - 7 * 24 * 60 * 60) * 1000);
  const bid = temp.filter((res) => new Date(res.createdAt) >= oldDate);

  // const bid = allBidArchitect.filter((val) => val.bid === true);

  useEffect(() => {
    if (bid.length !== 0) {
      setBids(true);
    } else {
      setBids(false);
    }
  }, [bid]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main__inner}>
          <div className={styles.title}>
            Bid View
            <span className={styles.dot}>
              <Image src="/img/architect-dashboard/dot.svg" alt="dot" width={3} height={3} />
            </span>
            <span className={styles.number}>{bid?.length}</span>
          </div>
          <div className={styles.bidCard__container}>
            {bid
              ?.slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <>
                    <div key={index} className={styles.bid__projectCard}>
                      <div className={styles.bid__projectCard__top}>
                        <img
                          src={
                            item?.thumbnail
                              ? item?.thumbnail
                              : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                          }
                          onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                          alt=""
                        />
                        <div className={styles.bid__projectCard__title}>
                          <h5>{item?.project_name}</h5>
                          <p>{item?.project_type}</p>
                        </div>
                      </div>
                      <div className={styles.bid__projectCard__button} onClick={() => viewDetailsClick(item?._id)}>
                        View details
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
