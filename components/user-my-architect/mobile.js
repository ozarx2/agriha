/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import MobAgrihaArchProfileSingle from "./mobArchProfile";
import windowSize from "../windowRes";
import ArchHead from "./archHead";

import styles from "./main.module.css";

const FnUserMyArchitectMobile = () => {
  const windowRes = windowSize();
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;

  const [page, setPage] = useState(1);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e) => {
    setScrollTop(e.target.documentElement.scrollTop);
    setScrolling(e.target.documentElement.scrollTop > scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolling === true) {
      if (scrollTop + window.innerHeight >= document.body.offsetHeight + 92) {
        setPage(page + 1);
      }
    }
  }, [scrollTop]);

  /* GET PROJECT TYPES */
  async function getallArchitects() {
    if (windowRes.innerWidth <= 1100) {
      const token = localStorage.getItem("userToken");
      const res = await fetch(`${api_url}/architects/view?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${dummy_token}`,
        },
      });
      const data = await res.json();
      setAllArchitects([...allArchitects, ...data]);
    }
  }

  useEffect(() => {
    getallArchitects();
  }, [page]);

  return (
    <>
      <ArchHead />
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            {allArchitects?.map((items, i) => {
              return <MobAgrihaArchProfileSingle key={i} items={items} i={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectMobile;
