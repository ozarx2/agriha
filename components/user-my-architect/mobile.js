/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import { StoreContext } from "../StoreContext";
import MobAgrihaArchProfileSingle from "./mobArchProfile";

import styles from "./main.module.css";
import stylesp from "./pagination.module.css";

const FnUserMyArchitectMobile = () => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);
  const [page, setPage] = useState(0);

  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;

  const handlePages = (value) => {
    console.log(value);
  };
  /* GET PROJECT TYPES */
  async function getallArchitects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    // setAllArchitects(data.data);
  }
  // console.log(allArchitects);

  useEffect(() => {
    if (allArchitects.length === 0) {
      getallArchitects();
    }
  }, []);

  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            {allArchitects?.map((items, i) => {
              return <MobAgrihaArchProfileSingle key={i} items={items} i={i} />;
            })}
            <div className={stylesp.paginationSection}>
              <div className={stylesp.pageination}>
                <img
                  src="/img/architect/left.svg"
                  alt="left.svg"
                  onClick={() => handlePages(-1)}
                />
                <div className={stylesp.pageNum}>
                  01 <span>of 03</span>
                </div>
                <img
                  src="/img/architect/right.svg"
                  alt="left.svg"
                  onClick={() => handlePages(+1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectMobile;
