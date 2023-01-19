/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Image from "next/image";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

export default function ViewBidMain() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState([]);

  const [Store] = useContext(StoreContext);

  // const allBidArchitect = Store.allBidArchitect;

  // const tempone = allBidArchitect.filter((val) => val.bid === true);
  // const temp = tempone.filter((val) => val.status === "started");
  // const oldDate = new Date((Math.floor(+new Date() / 1000) - 7 * 24 * 60 * 60) * 1000);
  // const bid = temp.filter((res) => new Date(res.createdAt) >= oldDate);

  // console.log(bid);

  const viewDetailsClick = (id) => {
    router.push(`/view-bid/${id}`);
  };

  /* GET Bid PROJECT DETAILS */
  async function getBidProjects() {
    var token = localStorage.getItem("architectToken");
    const res = await fetch(`${api_url}/projects/trueBidProject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === 200) {
      const oldDate = new Date((Math.floor(+new Date() / 1000) - 7 * 24 * 60 * 60) * 1000);
      const bidData = data.data.filter((res) => new Date(res.createdAt) >= oldDate);
      // console.log(bidData);
      setBid(bidData);
      setLoading(true);
    }
  }

  useEffect(() => {
    getBidProjects();
  }, []);

  return (
    <>
      <div className={styles.main_outer}>
        {loading ? (
          <>
            {bid?.length !== 0 ? (
              <div className={styles.main__inner}>
                <div className={styles.title}>
                  Bid View
                  <span className={styles.dot}>
                    <Image src="/img/architect-dashboard/dot.svg" alt="dot" width={3} height={3} />
                  </span>
                  <span className={styles.number}>{bid?.length}</span>
                </div>
                <div className={styles.bidCard__container}>
                  {bid
                    ?.slice(0)
                    .reverse()
                    .map((item, index) => {
                      return (
                        <div key={index} className={styles.bid__projectCard}>
                          <img
                            src={item?.thumbnail ? item?.thumbnail : "/img/common/ni.jpg"}
                            onError={(e) => (e.target.src = "/img/common/ina.png")}
                            alt=""
                          />
                          <div>
                            <table className={styles.table_out}>
                              <tbody>
                                <tr>
                                  <td>Name</td>
                                  <td>: {item?.project_name}</td>
                                </tr>
                                <tr>
                                  <td>Type</td>
                                  <td>: {item?.project_type}</td>
                                </tr>
                                <tr>
                                  <td>Location</td>
                                  <td>: {item?.project_requirements[0]?.location}</td>
                                </tr>
                                <tr>
                                  <td>Starting Date</td>
                                  <td>: {item?.starting_date}</td>
                                </tr>
                                <tr>
                                  <td>Budget</td>
                                  <td>: {item?.project_requirements[0]?.budget}</td>
                                </tr>
                              </tbody>
                            </table>
                            {/* <div className={styles.bid__projectCard__title}>
                        <h5>{item?.project_name}</h5>
                        <p>
                          {item?.project_type}
                          {item?.project_requirements[0]?.location
                            ? ` at ${item?.project_requirements[0]?.location}`
                            : ""}
                        </p>
                        <p>{item?.starting_date}</p>
                        <p>
                          {item?.project_requirements[0]?.budget ? `₹ ${item?.project_requirements[0]?.budget}` : ""}
                        </p>
                      </div> */}
                            <div
                              className={styles.bid__projectCard__button}
                              onClick={() => viewDetailsClick(item?._id)}
                            >
                              View details
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={styles.no_files}>
                <h3>“No Bids”</h3>
                <h5>Sorry, no bids listed by home seeker</h5>
              </div>
            )}
          </>
        ) : (
          <div className={styles.main_inner}>
            <div className={styles.loading}>
              <img src="/img/landing/loading.svg" alt="Loading..." />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
