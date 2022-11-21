/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import Project from "./project";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import api_url from "../../../src/utils/url";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const state = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    800: {
      items: 2,
    },
    1000: {
      items: 2.5,
    },
  },
};

export default function SectionTwo(architectId) {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    try {
      if (architectId?.id) {
        const response = await fetch(`${api_url}/projects/${architectId.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
          },
        });
        const data = await response.json();
        if (data) {
          setProjects(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, [architectId]);

  const allProjects = projects?.map((items, index) => {
    return (
      <>
        <div className="item" key={index}>
          <Project
            url={items.Image?.[0]}
            title={items.projectname}
            id={items._id}
          />
        </div>
      </>
    );
  });

  return (
    <div className={styles.section_two} id="section_two">
      <div className={styles.project_heading}>
        <h3>{projects?.length} Projects</h3>
        {/* <button>View all</button> */}
      </div>
      <div className={styles.project_slider}>
        <OwlCarousel
          loop={true}
          items={2.5}
          responsiveRefreshRate={0}
          autoplay={true}
          autoplayTimeout={7000}
          autoplayHoverPause={true}
          nav={true}
          navText={[
            "<i className='icon-arrow-prev'></i>",
            "<i className='icon-arrow-next'></i>",
          ]}
          dots={false}
          margin={10}
          responsive={state.responsive}
        >
          {allProjects}
        </OwlCarousel>
      </div>
    </div>
  );
}
