/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/ViewProjectArch.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import api_url from "../src/utils/url";

const ViewProjectArch = () => {
  const [project, setProject] = useState([]);
  const [projectImg, setProjectImg] = useState([]);

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var projectId = localStorage.getItem("projectIdImage");
    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });

    const data = await res.json();
    console.log(data[0]);
    setProject(data[0]);
    setProjectImg(data[0].Image);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const imageview = (url) => {
    document.getElementById("viewProjectArch").style.display = "none";
    document.getElementById("imageGallery").style.display = "block";
  };

  const closeClick = () => {
    document.getElementById("imageGallery").style.display = "none";
    document.getElementById("viewProjectArch").style.display = "flex";
  };

  const slideref = useRef();

  if (typeof window !== "undefined") {
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          slideref.current.goBack();
          break;
        case 39:
          slideref.current.goNext();
          break;
      }
    };
  }

  return (
    <div>
      <div className={styles.viewProjectArch} id="viewProjectArch">
        <div className={styles.title__viewProjectArch}>
          <h3>Project Name : {project.projectname}</h3>
          <h4>Project Location : {project.location}</h4>
          <h5>Total Area : {project?.projectarea} sq.ft</h5>
        </div>
        <div className={styles.content__viewProjectArch}>
          {projectImg?.map((items, index) => {
            return (
              <div onClick={() => imageview(items)} key={index} className={styles.image__project__viewProjectArch}>
                <img src={items} alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.imageGallery} id="imageGallery">
        <Slide ref={slideref}>
          {projectImg.map((items, index) => {
            return (
              <div key={index} className={styles.each_slide_effect}>
                <div style={{ backgroundImage: `url(${items})` }}>
                  <div onClick={closeClick} className={styles.closeButtonContainer}>
                    <Image src="/close.svg" alt="" width={30} height={30}></Image>
                  </div>
                </div>
              </div>
            );
          })}
        </Slide>
      </div>
    </div>
  );
};

export default ViewProjectArch;
