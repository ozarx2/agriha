import React from "react";
import styles from "../styles/Main.module.css";
import Image from "next/image";
import Link from "next/link";
import FooterMobile from "./FooterMobile";

const MainMobile = () => {
  return (
    <div className={styles.mainMobile}>
      <section className={styles.main__section__mobile}>
        <div className={styles.title__mobile}>
          <div className={styles.text__title__mobile}>
            <h1>
              Build your dream <br /> home with a few <br /> clicks !
            </h1>
          </div>
          <div className={styles.image__title__mobile}>
            <div className={styles.bubble__title__mobile}>
              <Image
                src="/bubbleMobile1.png"
                alt=""
                width={65}
                height={80}
              ></Image>
            </div>
          </div>
        </div>
        <div className={styles.greenBg}>
          <div className={styles.imageContainer__mobile}>
            <div className={styles.imgMain}>
              <Image src="/main2.png" alt="" width={550} height={380}></Image>
            </div>
            <div className={styles.bubbleMobileTwo}>
              <Image
                src="/bubbleMobile2.png"
                alt=""
                width={50}
                height={60}
              ></Image>
            </div>
          </div>
          <div className={styles.tryItNow__button__container__mobile}>
            <Link href="/sendotp" passHref>
              <div className={styles.tryITNow__button__mobile}>
                DESIGN MY HOME
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.about__container__mobile}>
          <div>
            <Image
              className={styles.imgHero}
              src="/main.png"
              alt=""
              width={550}
              height={600}
            ></Image>
          </div>
          <div className={styles.aboutText}>
            <h3>About Us</h3>
            <p>
              We are a team of of dedicated professionals committed to creating
              beautiful and sustainable homes. We believe in the power of
              architecture to shape urban environments, improve quality of life
              and positively impact society. AGRIHA offers complete design-build
              services to meet the needs of our clients from concept through
              completion. Our goal is to be the go-to source for high quality
              architecture. We have extensive experience in working with
              different high end projects across Kerala incorporating our
              knowledge of both domestic and global trends.
            </p>
          </div>
          <div className={styles.WhatWeDo__mobile}>
            <h3>What We Do</h3>
            <p>Architectural services</p>
            <p>Site plan</p>
            <p>Floor plans</p>
            <p>Elevation</p>
            <p>Interior drawings</p>
            <p>3D views</p>
          </div>

          <div className={styles.howItWorks__mobile}>
            <h3>How it works</h3>
            <div className={styles.hiw__content__mobile}>
              <div className={styles.hiw__content__mobile_text}>
                <Image src="/one.svg" alt="" width={30} height={60}></Image>
              </div>
              <p>COLLECTION OF REQUIREMENTS AND INITIAL PAYMENT FROM CLIENT.</p>
            </div>
            <div className={styles.hiw__content__mobile}>
              <div className={styles.image__hiwContent__mobile}>
                <Image src="/two.svg" alt="" width={40} height={70}></Image>
              </div>
              <p>
                TELEPHONIC DISCUSSION BETWEEN EXPERTS FROM ARCLIF AND CLIENT TO
                COLLECT ADDITIONAL DETAILS (IF REQUIRED).
              </p>
            </div>
            <div className={styles.hiw__content__mobile}>
              <div className={styles.image__hiwContent__mobile}>
                <Image src="/three.svg" alt="" width={40} height={60}></Image>
              </div>
              <p>
                TIMELY SUBMISSION OF DELIVERABLES AS PER SUBSCRIPTION PLANS
                SUBJECT TO REALIZATION OF PAYMENTS.
              </p>
            </div>
            <div className={styles.hiw__content__mobile__last}>
              <div className={styles.image__hiwContent__mobile}>
                <Image src="/four.svg" alt="" width={40} height={70}></Image>
              </div>
              <p>
                FINAL REVIEW AND DISCUSSION WITH CLIENT FOR ANY CHANGES ON
                EXISTING DELIVERABLES AND ADD ON SERVICES.
              </p>
            </div>
          </div>

          <div className={styles.quoteContainer__mobile}>
            <div className={styles.buttonContainer__mobile}>
              {/* <div
                id="leftButtonScroll"
                className={styles.left__arrowContainer__mobile}
              >
                <Image
                  className={styles.arrowLeft}
                  src="/leftArrow.svg"
                  alt=""
                  width={13}
                  height={13}
                ></Image>
              </div> */}
            </div>

            <div className={styles.cards__container__mobile}>
              <div className={styles.card__quote__container__mobile}>
                <Image
                  className={styles.quoteStart}
                  src="/quoteStart.svg"
                  alt=""
                  width={30}
                  height={30}
                ></Image>
                <p>
                  Arclif has very professional and approachable architecture
                  team. The whole procedure starting from planning home design
                  till execution went extremely smooth. We now have a beautiful
                  home which is exactly as I envisaged. I will recommend them to
                  any of my friends and relatives who need to design their home.
                </p>
                <div className={styles.quoteEnd__container__mobile}>
                  <Image
                    className={styles.quoteStart}
                    src="/quoteEnd.svg"
                    alt=""
                    width={30}
                    height={30}
                  ></Image>
                </div>
                <div className={styles.userProfile__container__mobile}>
                  <div className={styles.userInfo__container__mobile}>
                    <h5>- Mohammed Sadhik</h5>
                    {/* <p>CEO, Brand Name</p> */}
                  </div>
                </div>
              </div>

              <div className={styles.card__quote__container__mobile}>
                <Image
                  className={styles.quoteStart}
                  src="/quoteStart.svg"
                  alt=""
                  width={30}
                  height={30}
                ></Image>
                <p>
                  We love our newly designed home, Great ideas and designs. All
                  thanks to the team from Arclif. Through out the design phase
                  communication has been of the very highest standard. We look
                  forward to work with them again
                </p>
                <div className={styles.quoteEnd__container__mobile}>
                  <Image
                    className={styles.quoteStart}
                    src="/quoteEnd.svg"
                    alt=""
                    width={30}
                    height={30}
                  ></Image>
                </div>
                <div className={styles.userProfile__container__mobile}>
                  <div className={styles.userInfo__container__mobile}>
                    <h5>- Sabu Haji</h5>
                    {/* <p>CEO, Brand Name</p> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer__mobile}>
              {/* <div
                id="rightButtonScroll"
                className={styles.right__arrowContainer__mobile}
              >
                <Image
                  className={styles.arrowRight}
                  src="/rightArrow.svg"
                  alt=""
                  width={13}
                  height={13}
                ></Image>
              </div> */}
            </div>
          </div>
        </div>
        <FooterMobile />
      </section>
    </div>
  );
};

export default MainMobile;
