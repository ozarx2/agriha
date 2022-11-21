import React from "react";
import styles from "../styles/OurRecentWorks.module.css";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

const OurRecentWorks = () => {
  return (
    <div className={styles.ourRecentworks}>
      <div className={styles.title__ourRecentworks}>
        <h2>Completed Projects</h2>
        <p>
          Successfully completed Residential and
          Commercial projects across Kerala.
        </p>
      </div>
      <div className={styles.ourRecentworks_Main}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              margin: "5px",
              border: "1px solid #119076",
              color: "#ffffff",
              height: 15,
              width: 15,
              marginTop: 50,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#119076",
            },
          }}
          animation="slide"
          duration="500"
          swipe="true"
          interval="2000"
          navButtonsAlwaysInvisible="true"
        >
          <div className={styles.cardContainer__ourRecentworks}>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent1.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent2.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
          </div>

          <div className={styles.cardContainer__ourRecentworks}>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent3.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent4.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
          </div>

          <div className={styles.cardContainer__ourRecentworks}>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent5.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
            <div className={styles.card__ourRecentworks}>
              <Image
                src="/recent6.jpg"
                alt=""
                width={550}
                height={300}
              ></Image>
            </div>
          </div>
        </Carousel>
      </div>

      <div className={styles.ourRecentworks_mobile}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              margin: "5px",
              border: "1px solid #119076",
              color: "#ffffff",
              height: 15,
              width: 15,
              marginTop: 50,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#119076",
            },
          }}
          animation="slide"
          duration="500"
          swipe="true"
          interval="2000"
          navButtonsAlwaysInvisible="true"
        >
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent1.jpg" alt="" width={550} height={350}></Image>
          </div>
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent2.jpg" alt="" width={550} height={350}></Image>
          </div>
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent3.jpg" alt="" width={550} height={350}></Image>
          </div>
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent4.jpg" alt="" width={550} height={350}></Image>
          </div>
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent5.jpg" alt="" width={550} height={350}></Image>
          </div>
          <div className={styles.card__ourRecentworks}>
            <Image src="/recent6.jpg" alt="" width={550} height={350}></Image>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default OurRecentWorks;
