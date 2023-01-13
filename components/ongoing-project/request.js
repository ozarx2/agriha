/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

const Request = ({ name, avatar, type, id, setPage, item }) => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  // console.log(id);

  const userProjectsDetails = Store.userProjectsDetails;
  const setArcDashQueue = Store.setArcDashQueue;
  const setRequestOrBid = Store.setRequestOrBid;
  const setRequestOrBidID = Store.setRequestOrBidID;

  const results = userProjectsDetails?.filter((res) => res.project === id);

  // console.log(userProjectsDetails);
  // console.log(results);

  /* ACCEPT REQUEST */
  async function acceptRequest(status) {
    var token = localStorage.getItem("architectToken");

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
    if (data.projectdata) {
      setArcDashQueue(false);
    }
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
    <div className={`${styles.stwo_grid_outer} ${styles.request}`}>
      <div className={styles.stwo_username}>
        <div className={styles.vertical_center}>
          <img src={avatar} onError={(e) => (e.target.src = "/img/landing/profile_img.svg")} alt="alt" />
          <span>{name}</span>
        </div>
      </div>
      <div className={styles.stwo_description}>{type}</div>
      <div className={styles.stwo_total_area}>
        {item?.project_requirements[0]?.area} <span>sqft</span>
      </div>
      <div className={styles.stwo_budget}>
        <span>₹ </span>
        {item?.project_requirements[0]?.budget}
      </div>
      {/* <div className={styles.stwo_reference_file}>
        <div className={styles.download_btn}>
          <img src="/img/ongoing-project/arrow-down.svg" alt="alt" />
          <span>Download</span>
        </div>
      </div> */}
      <div className={styles.stwo_action}>
        <div className={styles.vertical_center}>
          {/* <Link href={`/view-bid/${item._id}`}>
            <div className={styles.view_btn}>View</div>
          </Link>
          <div className={styles.ignore_btn} onClick={() => acceptRequest("declined")}>
            Ignore
          </div>
          <div className={styles.accept_btn} onClick={() => acceptRequest("ongoing")}>
            Accept
          </div> */}
          <div className={styles.accept_btn} onClick={() => viewFunction()}>
            View
          </div>
        </div>
      </div>
      {/* <div className={styles.stwo_more}>
        <div onClick={() => moreClick(i)}>
          <img src="/img/ongoing-project/3dots.svg" alt="alt" />
        </div>
        <div className={styles.popup_outer} id={`more${i}`}>
          <div className={styles.view_more} onClick={() => setProjectRequestPopup(true)}>
            View more
          </div>
          <div onClick={() => moreClick(i)} className={styles.cancel}>
            Cancel
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Request;
