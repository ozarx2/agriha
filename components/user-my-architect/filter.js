/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";

import styles from "./filter.module.css";

const FnFilter = () => {
  const [Store] = useContext(StoreContext);

  const allArchitects = Store.allArchitects;

  const [count, setCount] = useState("");
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
    // console.log(data);
    setCount(data.count);
  }
  // console.log(allArchitects);

  useEffect(() => {
    if (allArchitects.length === 0) {
      getallArchitects();
    }
  }, []);

  return (
    <>
      <div className={styles.filterSectionMain}>
        <div className={styles.filterSection}>
          <div className={styles.filterDivLeft}>
            <div className={styles.allFilter}>
              <img src="/img/architect/filter.svg" alt="filter.svg" className={styles.filterIcon} />
              <div>All Filters</div>
            </div>
            <div className={styles.allSort}>
              <img src="/img/architect/sort.svg" alt="sort.svg" className={styles.sortIcon} />
              <div>Sort list</div>
            </div>
            <div className={styles.allCategory}>
              <div>Professional category</div>
              <img src="/img/architect/downarrow.svg" alt="downarrow.svg" className={styles.categoryIcon} />
            </div>
          </div>
          <div className={styles.filterDivRight}>
            <div className={styles.pagination}>1 – 10 of {count} professionals</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FnFilter;
