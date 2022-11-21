import React, { useState } from "react";
import styles from "../styles/GetInTouch.module.css";
import Image from "next/image";
import endpoint from "../src/utils/endpoint";

const GetInTouch = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const storeValues = () => {
    setEmail(document.getElementById("email").value);
    setName(document.getElementById("name").value);
    setNumber(document.getElementById("number").value);
    setMessage(document.getElementById("message").value);
  };

  async function handleSubmit() {
    if (
      document.getElementById("sendMessageButton").innerHTML !== "Thankyou !"
    ) {
      if (name !== "") {
        document.getElementById("nameInput").style.borderBottom =
          "1px solid #dddddd";
        if (email !== "") {
          document.getElementById("emailInput").style.borderBottom =
            "1px solid #dddddd";
          if (email.includes("@") && email.includes(".com")) {
            document.getElementById("emailInput").style.borderBottom =
              "1px solid #dddddd";
            let isnum = /^\d+$/.test(number);
            if (number.length == 10) {
              document.getElementById("phoneNumberInput").style.borderBottom =
                "1px solid #dddddd";
              if (isnum) {
                document.getElementById("phoneNumberInput").style.borderBottom =
                  "1px solid #dddddd";
                if (message !== "") {
                  document.getElementById("message").style.border =
                    "1px solid #dddddd";
                  await fetch(`${endpoint}/enquiry`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: email,
                      username: name,
                      phone: number,
                      message: message,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.status === 200) {
                        document.getElementById("sendMessageButton").innerHTML =
                          "Thank You !";
                        document.getElementById(
                          "sendMessageButton"
                        ).style.backgroundColor = "#11907c";
                        document.getElementById(
                          "sendMessageButton"
                        ).style.cursor = "default";
                      }
                    });
                } else {
                  document.getElementById("message").style.border =
                    "1px solid red";
                }
              } else {
                console.log("number none");
                document.getElementById("phoneNumberInput").style.borderBottom =
                  "1px solid red";
              }
            } else {
              console.log("number less than zero");
              document.getElementById("phoneNumberInput").style.borderBottom =
                "1px solid red";
            }
          } else {
            console.log("email null");
            document.getElementById("emailInput").style.borderBottom =
              "1px solid red";
          }
        } else {
          console.log("email null");
          document.getElementById("emailInput").style.borderBottom =
            "1px solid red";
        }
      } else {
        console.log("name null");
        document.getElementById("nameInput").style.borderBottom =
          "1px solid red";
      }
    }
  }

  return (
    <div className={styles.getInTouch}>
      <div className={styles.title__getInTouch} id="contact">
        <h2>Get in touch</h2>
        <p>
          We&#39;d love to hear from you. Tell us a bit about yourself, and we
          will get in touch as soon as we can.
        </p>
      </div>
      <div className={styles.card__getInTouch}>
        <div className={styles.left__card__getInTouch}>
          <div className={styles.text__left__card__getInTouch}>
            <h3>Contact Info</h3>
            <p></p>
            <br />
            <div className={styles.logo__left__card__getInTouch}>
              <Image src="/arclifLogo.png" alt="" width={110} height={40} />
            </div>
            <h4>Address</h4>
            <p>ARCLIF INC</p>
            <p>3rd Floor ,Sahya Government Cyberpark, Kerala 673014.</p>
            <p>HQ : Coastal Hwy, Lewes, Delaware 19958, USA.</p>
            <div className={styles.numbers__left__card__getInTouch}>
              <h5>
                <a href="tel:+919995111325">+91 99951 11325</a>
              </h5>
              <h5>
                <a href="tel:+914953500185">+91 495 350 0185</a>
              </h5>
            </div>
            <div className={styles.buttonContainer__left__card__getInTouch}>
              <a
                href="https://www.google.com/maps/place/Arclif+Technologies+Pvt+Ltd/@11.2540584,75.8349428,17z/data=!3m1!4b1!4m5!3m4!1s0x3ba65b92a5357bad:0x2e562acd470a7e0e!8m2!3d11.2540584!4d75.8371315"
                className={styles.getLocation__Button}
              >
                <div>
                  <Image
                    src="/locationIcon.svg"
                    alt=""
                    width={17}
                    height={17}
                  />
                </div>
                Get location
              </a>
              <a href="tel:9995111325" className={styles.call__Button}>
                <div>
                  <Image
                    src="/callIconMain.svg"
                    alt=""
                    width={15}
                    height={15}
                  />
                </div>
                Call
              </a>
            </div>
          </div>
          <div className={styles.social__left__card__getInTouch}>
            <a href="https://www.instagram.com/arclifonline">
              <Image src="/instagramIcon.svg" alt="" width={20} height={20} />
            </a>
            <a href="https://in.linkedin.com/company/arclif">
              <Image src="/linkedInIcon.svg" alt="" width={20} height={20} />
            </a>
            <a href="https://arclif.com/">
              <Image src="/webIcon.svg" alt="" width={19} height={19} />
            </a>
            <a href="https://www.facebook.com/arclifonline/">
              <Image src="/facebookIcon.svg" alt="" width={20} height={20} />
            </a>
          </div>
        </div>
        <div className={styles.right__card__getInTouch}>
          <h3>Enquire Now</h3>
          <p></p>
          <br />
          <div id="nameInput" className={styles.inputConatiner__getInTouch}>
            <input
              onChange={storeValues}
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div id="emailInput" className={styles.inputConatiner__getInTouch}>
            <input
              onChange={storeValues}
              id="email"
              type="email"
              placeholder="Email id"
            />
          </div>
          <div
            id="phoneNumberInput"
            className={styles.inputConatiner__getInTouch}
          >
            <input
              onChange={storeValues}
              id="number"
              type="tel"
              placeholder="Phone number"
            />
          </div>
          <div className={styles.textAreaConatiner__getInTouch}>
            <textarea
              onChange={storeValues}
              id="message"
              placeholder="Message here ..."
            />
          </div>
          <div
            id="sendMessageButton"
            onClick={handleSubmit}
            className={styles.sendMessageButton}
          >
            Send Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
