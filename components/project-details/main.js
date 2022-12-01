/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";
// import api_url from "../../src/utils/url";
var api_url = "https://arclif-agriha.herokuapp.com";
import AgrihaImageGrid from "../user-common/image-grid";
import AgrihaProjectDetailsMainMobileTop from "./mobile-top";
import AgrihaProjectDetailsMainDesktopTop from "./desktop-top";

import styles from "./main.module.css";

export default function AgrihaProjectDetailsMain() {
  const [windowRes, setWindowRes] = useState([]);

  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }

  const [allProject, setAllProject] = useState([]);
  const [allProjectSliced, setAllProjectSliced] = useState([]);
  async function getAllProjects() {
    const response = await fetch(`${api_url}/projects/getallprojects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      // console.log(data.data);
      const withArchitectNoOrder = data.data.filter((res) => res?.architect_id);
      const withArchitect = withArchitectNoOrder.reverse();
      setAllProject(withArchitect);
    }
  }
  // console.log(allProject);

  function groupN(array, num) {
    const group = [];
    for (let i = 0; i < array.length; i += num) {
      group.push(array.slice(i, i + num));
    }
    setAllProjectSliced(group);
  }

  // console.log(allProjectSliced);

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    groupN(allProject, 4);
  }, [allProject]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? (
            <AgrihaProjectDetailsMainDesktopTop />
          ) : (
            <AgrihaProjectDetailsMainMobileTop />
          )}

          <div className={styles.sthree_outer}>
            <div className={`container ${styles.container} ${styles.sthree}`}>
              <div className={styles.sthree_inner}>
                {allProject.length !== 0 ? (
                  <AgrihaImageGrid allProjectSliced={allProjectSliced} />
                ) : (
                  <div className={styles.loading}>
                    <img src="/img/landing/loading.svg" alt="Loading..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
