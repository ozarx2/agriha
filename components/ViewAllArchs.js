/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import api_url from "../src/utils/url";
import Archstyles from "../styles/BodyAddArchitect.module.css";
import registerstyles from "../styles/BodyRegister.module.css";
import Headerstyles from "../styles/Header.module.css";
import styles from "../styles/ViewAllArchs.module.css";

const ViewAllArchs = () => {
  const [architects, setArchitects] = useState([]);

  async function deleteArchitect(id) {
    var result = confirm("Are you sure, you want to Delete?");
    if (result) {
      const res = await fetch(`${api_url}/architects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dummy_token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        window.location.reload();
      }
    }
  }

  async function getAllArchitect() {
    const res = await fetch(`${api_url}/architects/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitects(data);
  }

  useEffect(() => {
    getAllArchitect();
  }, []);

  const addArchitects = () => {
    window.location.href = "/addArchitect";
  };

  const architectView = (id) => {
    console.log(id);
    localStorage.setItem("viewArchAdmin", id);
    window.location.href = `/architect/${id}`;
  };

  return (
    <div className={Archstyles.bodyRegister} style={{ backgroundImage: `url('/registerBg.png')` }}>
      <div className={registerstyles.header__bodyRegister}>
        <div className={Headerstyles.header__left}>
          <Image
            className={Headerstyles.header__logo}
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={100}
          />
        </div>
        <div onClick={addArchitects} className={Archstyles.viewAll}>
          Add Architects
        </div>
      </div>
      <div
        style={{
          padding: "50px 5vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            marginBottom: "50px",
          }}
        >
          All Architects
        </h3>
        <div className={styles.architectCard__container}>
          {architects?.map((items, index) => {
            return (
              <div key={index} className={styles.architectCard}>
                <div className={styles.deleteButton}>
                  <img onClick={() => deleteArchitect(items._id)} src="/deleteIcon.png" alt="" />
                </div>
                <div onClick={() => architectView(items._id)} className={styles.architectCard__content}>
                  <img
                    src={
                      items?.profilepic
                        ? items.profilepic
                        : "https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png"
                    }
                    onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                    alt=""
                    className={styles.profileImage}
                  />
                  <div className={styles.architectCard__content__text}>
                    <h5>{items?.registered_id?.name ? items?.registered_id?.name : items?.firstname}</h5>
                    <p>Architect</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewAllArchs;
