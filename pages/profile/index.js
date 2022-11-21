/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import SectionOne from "./section-one";
import SectionTwo from "./section-two";
import ReactLoading from "react-loading";
import AlsoViewed from "./also-viewed";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import api_url from "../../src/utils/url";
import endpoint from "../../src/utils/endpoint";

export default function Home() {
  const [architectData, setArchitectData] = useState("");
  const [selectBtn, setSelectBtn] = useState(false);
  const [architectId, setArchitectId] = useState("");
  const [loading, setLoading] = useState(true);

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setArchitectId(pair[0]);
    }
  }
  async function getarchitectData() {
    try {
      if (architectId) {
        const response = await fetch(`${api_url}/architects/${architectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data) {
          setLoading(false);
          setArchitectData(data);
        }
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  useEffect(() => {
    getarchitectData();
  }, [architectId]);

  /* SEND MAIL TO USER */
  async function sendmail() {
    const token = localStorage.getItem("userToken");
    var id = localStorage.getItem("projectId");
    console.log(id);
    const res = await fetch(`${endpoint}/user/project_success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      window.location.href = "/dashboard";
    }
  }

  const handleSelectBtn = async () => {
    setSelectBtn(true);
    var projectId = localStorage.getItem("projectId");
    try {
      const response = await fetch(
        `${api_url}/projects/Choose_architect/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
          },
          body: JSON.stringify({
            architect_id: architectId,
          }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.status === 200) {
        sendmail();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>View Profile Architect</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header>header</header> */}

      <div className={styles.container_outer}>
        {loading ? (
          <div className={styles.loader}>
            <PulseLoader color="#1c9c76" />
          </div>
        ) : (
          ""
        )}

        <div className={styles.container}>
          <div className={styles.profile_view_outer}>
            <div className={styles.main_left}>
              <div className={styles.profile_right}>
                <img
                  className={styles.profile_image}
                  src={architectData.profilepic}
                  alt="logo-img"
                />
                <div className={styles.profile_head_right}>
                  <h3>
                    {architectData.firstname} {architectData.lastname}
                  </h3>
                  {/* <h5>Interior Designers & Decorators</h5> */}
                  <h4>{architectData.location}</h4>
                  <div className={styles.select}>
                    {selectBtn ? (
                      <button onClick={handleSelectBtn}>
                        {/*  <img src="/img/selected.svg" alt="select" /> */}
                        <span>Selected</span>
                      </button>
                    ) : (
                      <button onClick={handleSelectBtn}>
                        <img src="/img/round.png" alt="select" />
                        <span>Select</span>
                      </button>
                    )}
                  </div>
                  <div className={styles.share}>
                    <div>
                      <img src="/img/contact.svg" alt="star" />
                      <span>Contact</span>
                    </div>
                  </div>
                  <div className={styles.clear}></div>
                </div>
              </div>
              <SectionOne bio={architectData.bio} />
              <SectionTwo id={architectId} />
            </div>
            <div className={styles.main_right}>
              <AlsoViewed id={architectId} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.clear}></div>

      {/*  <footer className={styles.footer}>footer</footer> */}
    </>
  );
}
