/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function SectionOne(about_us) {
  const [readMore, setReadMore] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(about_us?.bio);
  }, [about_us]);
  return (
    <div className={styles.section_one}>
      <div className={styles.link}>
        <Link href="/profile/#section_one">
          <a className={styles.active}>About us</a>
        </Link>
        <Link href="/profile/#section_two">
          <a>Projects</a>
        </Link>
      </div>
      <div id="section_one" className={styles.about_content}>
        <p style={{ marginBottom: "0px" }} data-aos="fade-in">
          {text?.slice(0, 110)}
        </p>
        {text?.length > 110 ? (
          <>
            {readMore ? (
              ""
            ) : (
              <>
                <button
                  className={styles.button}
                  style={{ marginTop: "10px" }}
                  onClick={() => setReadMore(true)}
                >
                  Read more &nbsp;&nbsp;
                  <img src="/img/down.png" alt="down" />
                </button>
              </>
            )}
          </>
        ) : (
          ""
        )}

        {readMore ? (
          <>
            <p data-aos="fade-in" style={{ marginTop: "0px" }}>
              {text?.slice(110, about_us.bio?.length)}
            </p>
            <button
              data-aos="fade-in"
              className={styles.button}
              onClick={() => setReadMore(false)}
            >
              Show less &nbsp;&nbsp;
              <img src="/img/up.png" alt="up" />
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
