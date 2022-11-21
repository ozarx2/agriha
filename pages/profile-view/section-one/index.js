/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
        <Link href="/profile-view/#section_one">
          <a className={styles.active}>About me</a>
        </Link>
        {/*  <Link href="/profile-view/#section_two">
          <a>My Projects</a>
        </Link> */}
        {/*  <Link href="/profile-view/#section_two">
          <a>Ongoing Project</a>
        </Link> */}
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
