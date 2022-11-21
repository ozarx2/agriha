import React from "react";
import styles from "../styles/HowItWorks.module.css";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <div className={styles.howItWorks} id="howItWorks">
      <div className={styles.title__howItWorks}>
        <h2>How it works</h2>
        <p>
          We believe that an architect can and should be the &quot;architect of
          choice.&quot; Before we design your space, our team of experts get to
          know you, what&#39;s most important to you, how you want to live and
          more ensuring you have an incredible experience and memories to take
          forward.
        </p>
      </div>
      <div className={styles.flow__howItWorks}>
        <div className={styles.flow__count}>1</div>
        <div className={styles.flow__contentCard}>
          <div className={styles.flow__contentCard__left__text}>
            <h3>Collection</h3>
            <p>COLLECTION OF REQUIREMENTS AND INITIAL PAYMENT FROM CLIENT.</p>
          </div>
          <div className={styles.flow__contentCard__right}>
            <Image src="/collection.svg" alt="" width={70} height={70} />
          </div>
        </div>
        <div className={styles.flow__count}>2</div>
        <div className={styles.flow__contentCard}>
          <div className={styles.flow__contentCard__left}>
            <Image src="/delivery.svg" alt="" width={80} height={80} />
          </div>
          <div className={styles.flow__contentCard__right__text}>
            <h3>Delivery</h3>
            <p>
              TIMELY SUBMISSION OF DELIVERABLES AS PER SUBSCRIPTION PLANS
              SUBJECT TO REALIZATION OF PAYMENTS.
            </p>
          </div>
        </div>
        <div className={styles.flow__count}>3</div>
        <div className={styles.flow__contentCard}>
          <div className={styles.flow__contentCard__left__text}>
            <h3>Discussion</h3>
            <p>
              TELEPHONIC DISCUSSION BETWEEN EXPERTS FROM ARCLIF AND CLIENT TO
              COLLECT ADDITIONAL DETAILS (IF REQUIRED).
            </p>
          </div>
          <div className={styles.flow__contentCard__right}>
            <Image src="/discussion.svg" alt="" width={70} height={70} />
          </div>
        </div>
        <div className={styles.flow__count}>4</div>
        <div className={styles.flow__contentCard}>
          <div className={styles.flow__contentCard__left}>
            <Image src="/final.svg" alt="" width={70} height={70} />
          </div>
          <div className={styles.flow__contentCard__right__text}>
            <h3>Final Review</h3>
            <p>
              FINAL REVIEW AND DISCUSSION WITH CLIENT FOR ANY CHANGES ON
              EXISTING DELIVERABLES AND ADD ON SERVICES.
            </p>
          </div>
        </div>
        {/* <div>
          <a
            href="https://youtu.be/4WVTLEA1uhQ"
            className={styles.button__howItsWorksDemo}
          >
            <div>
              <Image src="/playButton.svg" alt="" width={22} height={12} />
            </div>
            Watch video
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default HowItWorks;
