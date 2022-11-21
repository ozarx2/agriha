import React from "react";
import styles from "../styles/AboutUs.module.css";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs} id="aboutUs">
      <div className={styles.left__aboutUs}>
        <div className={styles.titleMobile__aboutUs}>
          <h2>About Us</h2>
        </div>
        <div>
          <Image src="/about.png" alt="" width={500} height={400} />
        </div>
      </div>
      <div className={styles.right__aboutUs}>
        <h2>About Us</h2>
        <p>
          We are a team of of dedicated professionals committed to creating
          beautiful and sustainable homes. We believe in the power of
          architecture to shape urban environments, improve quality of life and
          positively impact society. AGRIHA offers complete design-build
          services to meet the needs of our clients from concept through
          completion. Our goal is to be the go-to source for high quality
          architecture. We have extensive experience in working with different
          high end projects across Kerala incorporating our knowledge of both
          domestic and global trends.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
