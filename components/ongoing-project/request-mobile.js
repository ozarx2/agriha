/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";

import styles from "./main.module.css";

const RequestMobile = ({ name, avatar, type, id }) => {
  const [Store] = useContext(StoreContext);

  const userProjectsDetails = Store.userProjectsDetails;

  const results = userProjectsDetails?.filter((res) => res.project === id);

  // console.log(userProjectsDetails);
  // console.log(results);

  /* ACCEPT REQUEST */
  async function acceptRequest() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/accept/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "ongoing",
      }),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <div className={styles.stwo_mobile_request_grid_outer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src={avatar} onError={(e) => (e.target.src = "/img/landing/profile_img.svg")} alt="alt" />
          <div>
            <div>{name}</div>
            <div>{type}</div>
          </div>
        </div>
        <div className={styles.right}>
          <img onClick={() => setProjectRequestPopup(true)} src="/img/ongoing-project/more.svg" alt="alt" />
          <div>₹ 60,000,00</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.center}>
          <div className={styles.left}>
            <div>
              2500 <span>sqft</span>
            </div>
            <div>Malappuram, kerala, india</div>
          </div>
          {/* <div className={styles.right}>
        <img
          onClick={() =>
            setProjectRequestPopup(true)
          }
          src="/img/ongoing-project/download.svg"
          alt="alt"
        />
        <span>Reference file</span>
      </div> */}
        </div>
        <div className={styles.bottom}>
          <div className={styles.ignore}>Decline</div>
          <div className={styles.accept} onClick={() => acceptRequest()}>
            Accept
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestMobile;
