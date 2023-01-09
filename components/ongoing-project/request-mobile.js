/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

const RequestMobile = ({ name, avatar, type, id, item, setPage }) => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const userProjectsDetails = Store.userProjectsDetails;
  const setRequestOrBid = Store.setRequestOrBid;
  const setRequestOrBidID = Store.setRequestOrBidID;

  const results = userProjectsDetails?.filter((res) => res.project === id);

  // console.log(userProjectsDetails);
  // console.log(results);

  /* ACCEPT REQUEST */
  async function acceptRequest(status) {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/accept/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    const data = await res.json();
    // console.log(data);
    if (data) {
      setPage("ongoing");
    }
  }

  const viewFunction = () => {
    setRequestOrBid("request");
    setRequestOrBidID(id);
    router.push(`/view-bid/${item._id}`);
  };

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
          <img src="/img/ongoing-project/more.svg" alt="alt" onClick={() => viewFunction()} />
          {/* <img onClick={() => setProjectRequestPopup(true)} src="/img/ongoing-project/more.svg" alt="alt" /> */}
          <div>₹ {item?.project_requirements[0]?.budget}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.center}>
          <div className={styles.left}>
            <div>
              {item?.project_requirements[0]?.area} <span>sqft</span>
            </div>
            <div>{item?.project_requirements[0]?.location}</div>
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
          <div className={styles.right} onClick={() => viewFunction()}>
            <span className={styles.accept}>VIEW</span>
          </div>
        </div>
        {/* <div className={styles.bottom}>
          <div className={styles.ignore} onClick={() => acceptRequest("declined")}>
            Decline
          </div>
          <div className={styles.accept} onClick={() => acceptRequest("ongoing")}>
            Accept
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RequestMobile;
