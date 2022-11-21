import React from "react";
import styles from "../styles/WhatOurClientsSay.module.css";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

const WhatOurClientsSay = () => {
  return (
    <div className={styles.whatOurClientsSay}>
      <div className={styles.title__whatOurClientsSay}>
        <h2>What our clients says</h2>
        <p>
          We pride ourselves on providing an exceptional service to our clients,
          but you don’t just have to take our word for it. Listen to what our
          clients have to say about working with us.
        </p>
      </div>
      <div className={styles.whatOurClientsSay_main}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              margin: "5px",
              background: "transparent",
              border: "1px solid #119076",
              color: "#f1fcff",
              height: 15,
              width: 15,
              marginTop: 30,
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
          <div className={styles.cardContainer__whatOurClientsSay}>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                Arclif team did an incredible job designing our home. They
                developed a set of documents that supported the architecture my
                wife and I were looking for.
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Vincent</h5>
                <p>Nilambur</p>
              </div>
            </div>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                Arclif made our dream kitchen and bathrooms a reality by
                offering innovative insights for the designs. They were very
                professional and dependable. We would definitely recommend and
                use Agriha services for future projects.
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Anil</h5>
                <p>Manassery</p>
              </div>
            </div>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                It was an absolute pleasure working with Agriha Architecture.
                Shamseer was very professional and great to work with! They
                exceeded my expectations and will definitely be working with
                them again in the future. Highly recommend !!
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Anwar</h5>
                <p>Edakkara</p>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer__whatOurClientsSay}>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                I just want to say the biggest thank you to you to Sidheeque and
                your team. We have had a great experience with you. I cant thank
                you enough.
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Rinose</h5>
                <p>Kodiyathoor</p>
              </div>
            </div>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                Arclif is a professional team. They have knowledge experience
                and connections. They are pro active. We do not have to chase
                them for updated or information. They create value through
                design and save cost through efficiency.
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Niyas</h5>
                <p>Mundayil</p>
              </div>
            </div>
            <div className={styles.card__whatOurClientsSay}>
              <p>
                Working with Arclif is a privilege, they’re so talented. We love
                the house design. It’s unique and beautiful. It could stand
                anywhere in the world, yet it’s online.
              </p>
              <div className={styles.text__title__card__whatOurClientsSay}>
                <div className={styles.image__title__card__whatOurClientsSay}>
                  <Image src="/quote.svg" alt="" width={30} height={30}></Image>
                </div>
                <h5>Jafer</h5>
                <p>Areekode</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      <div className={styles.whatOurClientsSay_mobile}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              margin: "5px",
              background: "transparent",
              border: "1px solid #119076",
              color: "#f1fcff",
              height: 15,
              width: 15,
              marginTop: 30,
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
          interval="5000"
          navButtonsAlwaysInvisible="true"
        >
          <div className={styles.card__whatOurClientsSay}>
            <p>
              Arclif team did an incredible job designing our home. They
              developed a set of documents that supported the architecture my
              wife and I were looking for.
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Vincent</h5>
              <p>Nilambur</p>
            </div>
          </div>

          <div className={styles.card__whatOurClientsSay}>
            <p>
              Arclif made our dream kitchen and bathrooms a reality by offering
              innovative insights for the designs. They were very professional
              and dependable. We would definitely recommend and use Agriha
              services for future projects.
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Anil</h5>
              <p>Manassery</p>
            </div>
          </div>
          <div className={styles.card__whatOurClientsSay}>
            <p>
              It was an absolute pleasure working with Agriha Architecture.
              Shamseer was very professional and great to work with! They
              exceeded my expectations and will definitely be working with them
              again in the future. Highly recommend !!
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Anwar</h5>
              <p>Edakkara</p>
            </div>
          </div>
          <div className={styles.card__whatOurClientsSay}>
            <p>
              I just want to say the biggest thank you to you to Sidheeque and
              your team. We have had a great experience with you. I cant thank
              you enough.
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Rinose</h5>
              <p>Kodiyathoor</p>
            </div>
          </div>
          <div className={styles.card__whatOurClientsSay}>
            <p>
              Arclif is a professional team. They have knowledge experience and
              connections. They are pro active. We do not have to chase them for
              updated or information. They create value through design and save
              cost through efficiency.
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Niyas</h5>
              <p>Mundayil</p>
            </div>
          </div>
          <div className={styles.card__whatOurClientsSay}>
            <p>
              Working with Arclif is a privilege, they’re so talented. We love
              the house design. It’s unique and beautiful. It could stand
              anywhere in the world, yet it’s online.
            </p>
            <div className={styles.text__title__card__whatOurClientsSay}>
              <div className={styles.image__title__card__whatOurClientsSay}>
                <Image src="/quote.svg" alt="" width={20} height={20}></Image>
              </div>
              <h5>Jafer</h5>
              <p>Areekode</p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default WhatOurClientsSay;
