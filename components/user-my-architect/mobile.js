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
import stylesp from "./pagination.module.css";

const FnUserMyArchitectMobile = () => {
  const router = useRouter();
  const { location } = router.query;
  const [loadingAjax, setLoadingAjax] = useState(false);

  const [Store] = useContext(StoreContext);

  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;
  const arcPaginatioCount = Store.arcPaginatioCount;
  const setArcPaginationCount = Store.setArcPaginationCount;

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
      if (loadingAjax === false) {
        if (scrollTop + window.innerHeight >= document.body.offsetHeight + 92) {
          setArcPaginationCount(arcPaginatioCount + 1);
        }
      }
    }
  }, [scrollTop]);

  /* GET PROJECT TYPES */
  async function getallArchitects() {
    if (window.innerWidth <= 1100 && arcPaginatioCount * 5 != allArchitects.length) {
      setLoadingAjax(true);
      const token = localStorage.getItem("userToken");
      const res = await fetch(`${api_url}/architects/view?page=${arcPaginatioCount}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${dummy_token}`,
        },
      });
      const data = await res.json();
      if (data) {
        setLoadingAjax(false);
        setScrolling(false);
        setScrollTop(0);
        setAllArchitects([...allArchitects, ...data]);
      }
    }
  }

  useEffect(() => {
    getallArchitects();
  }, [arcPaginatioCount]);

  return (
    <>
      <div className={`container ${styles.container} ${styles.archHead_spl}`}>
        <ArchHead location={location} />
      </div>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            {allArchitects?.map((items, i) => {
              return <MobAgrihaArchProfileSingle key={i} items={items} i={i} />;
            })}
          </div>
          {loadingAjax ? (
            <div className={styles.loading_ajax}>
              <img src="/img/landing/loading.svg" alt="Loading..." />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectMobile;
