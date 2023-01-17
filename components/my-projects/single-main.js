/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import api_url from "../../src/utils/url";
import { useRouter } from "next/router";

import styles from "./single-main.module.css";

export default function SingleProjectsMain() {
  const router = useRouter();

  const [projectPopupOpen, setProjectPopupOpen] = useState(false);

  const [projectId, setProjectId] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);

  const [imagesNew, setImagesNew] = useState([]);

  const addFiles = (image) => {
    setImagesNew((imagesNew) => [...imagesNew, { src: image, width: 1080, height: 1080 }]);
  };

  useEffect(() => {
    if (projectDetails.Image?.length !== 0) {
      projectDetails?.Image?.map((item, i) => {
        addFiles(item);
        // console.log(item);
      });
    }
  }, [projectDetails?.Image]);

  // console.log(imagesNew);

  const slides = imagesNew.map(({ src, key, width, height, images }) => ({
    src,
    key,
    width,
    height,
    srcSet: images?.map((image) => ({
      src: image.src,
      width: image.width,
      height: image.height,
    })),
  }));

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProjectId(pair[0]);
      // console.log(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var token = localStorage.getItem("architectToken");
    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data[0]);
    setProjectDetails(data[0]);
  }

  useEffect(() => {
    if (projectId !== "") {
      getProjects();
    }
  }, [projectId]);

  const editProject = (id) => {
    router.push(`/edit-project/${id}`);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div className={styles.left}>
              <div className={styles.name}>{projectDetails?.projectname}</div>
              <div className={styles.location}>
                <span>{projectDetails?.location}</span> - <span>{projectDetails?.project_type}</span>
              </div>
              <div className={styles.area}>
                <span>{projectDetails?.projectarea}</span>
                <span> sq.ft</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.edit} onClick={() => editProject(projectId)}>
                <img src="/img/architect-dashboard/edit-project.svg" alt="alt" />
                <span>Edit</span>
              </div>
              <div className={styles.share}>
                <img src="/img/architect-dashboard/share.svg" alt="alt" />
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sone_one_outer}>
          <div className={styles.sone_one_inner}>
            <img
              className={styles.thumbnail}
              src={projectDetails?.thumbnail ? projectDetails?.thumbnail : "/img/architect-dashboard/noImg.jpeg"}
              onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
              alt="alt"
            />
            <div className={styles.contantContainer}>
              <p>{projectDetails?.description}</p>
              <h5>{projectDetails?.createdAt}</h5>
              <p>{projectDetails?.hashtag}</p>
            </div>
          </div>
        </div>
        <div className={styles.stwo_outer}>
          <div className={styles.stwo_inner}>
            <div className={styles.stwo_grid_max_outer}>
              {projectDetails?.Image?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <div onClick={() => setProjectPopupOpen(true)} className={styles.stwo_grid_outer}>
                      <img
                        src={item ? item : "/img/architect-dashboard/noImg.jpeg"}
                        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        alt="alt"
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <Lightbox open={projectPopupOpen} close={() => setProjectPopupOpen(false)} slides={slides} />
          </div>
        </div>
      </div>
    </>
  );
}
