/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import { StoreContext } from "../StoreContext";
import AgrihaArchProfileSingle from "./archProfile";

import styles from "./archProfiles.module.css";
import stylesp from "./pagination.module.css";

const FnArchProfiles = () => {
  const [Store] = useContext(StoreContext);
  const [loadingAjax, setLoadingAjax] = useState(false);

  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;
  const arcPaginatioCount = Store.arcPaginatioCount;
  const setArcPaginationCount = Store.setArcPaginationCount;

  const router = useRouter();
  const { s } = router.query;
  const location = s;
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
    if (scrolling === true && location === undefined) {
      if (loadingAjax === false) {
        if (scrollTop + window.innerHeight >= document.body.offsetHeight + 35) {
          setArcPaginationCount(arcPaginatioCount + 1);
        }
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    if (location && location != undefined) {
      setArcPaginationCount(1);
      getSearchArchitects(location);
    }
  }, [location]);

  useEffect(() => {
    if (location === undefined) {
      getallArchitects();
    }
  }, [arcPaginatioCount, location]);

  /* GET PROJECT TYPES */
  async function getallArchitects() {
    if (window.innerWidth >= 1100 && arcPaginatioCount * 5 != allArchitects.length) {
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

  async function getSearchArchitects(query) {
    const res = await fetch(`${api_url}/search/key?l=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });

    const data = await res.json();
    setAllArchitects(data.data);
  }

  return (
    <>
      {allArchitects?.map((items, i) => {
        return (
          <>
            <AgrihaArchProfileSingle key={i} items={items} i={i} />
          </>
        );
      })}
      {loadingAjax ? (
        <div className={styles.loading_ajax}>
          <img src="/img/landing/loading.svg" alt="Loading..." />
        </div>
      ) : (
        <></>
      )}
      {/* <div className={stylesp.paginationSection}>
        <div className={stylesp.pageination}>
          <img src="/img/architect/left.svg" alt="left.svg" onClick={() => handlePages(-1)} />
          <div className={stylesp.pageNum}>
            <span>Page : {page} </span>
          </div>
          <img src="/img/architect/right.svg" alt="left.svg" onClick={() => handlePages(+1)} />
        </div>
      </div> */}
    </>
  );
};
export default FnArchProfiles;
