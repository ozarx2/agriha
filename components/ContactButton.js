import React from "react";
import styles from "../styles/Home.module.css";

const ContactButton = () => {
  return (
    <div>
      <a href="tel:9995111325" className={styles.contactUs__button}>
        Contact Us
      </a>
    </div>
  );
};

export default ContactButton;
