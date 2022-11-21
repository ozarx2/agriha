import Image from "next/image";
import React, { useEffect, useState } from "react";
import endpoint from "../src/utils/endpoint";
import api_url from "../src/utils/url";
import styles from "../styles/ProjectView.module.css";
import style from "../styles/UploadDocument.module.css";

const ProjectDetailedView = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [details, setdetails] = useState([]);

  const [documents, setDocuments] = useState([]);

  async function getProjectDetails() {
    const projectId = localStorage.getItem("projectView");
    const response = await fetch(`${api_url}/projects/single/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      setProjectDetails(data.data[0]);
      setdetails(data.details[0]);
    }
  }

  /* GET UPLOADED FILES */
  async function getUploadedFiles() {
    const projectId = localStorage.getItem("projectView");
    const response = await fetch(
      `${endpoint}/fileupload/uploaded_file/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.data);
    setDocuments(data.data);
  }

  useEffect(() => {
    getProjectDetails();
    getUploadedFiles();
  }, []);

  const viewProfileClick = (id) => {
    localStorage.setItem("viewArch", id);
    localStorage.setItem("isSettings", "true");
    window.location.href = `/profile#/${id}`;
  };

  return (
    <div className={styles.projectView}>
      <div className={styles.headerProjectView}>
        <div>
          <h3>{projectDetails.project_name}</h3>
          <div className={styles.indicator__projectCard__content}>
            <span>
              <div></div>
            </span>
            <p>Started</p>
          </div>
        </div>
        <div className={styles.headerProjectView__date}>
          <p>Started Date</p>
          <h5>{projectDetails.starting_date}</h5>
        </div>
      </div>
      <div className={styles.projectViewContainer}>
        <div>
          <h4>Total Area</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.total_area}
              readOnly
              type="number"
              name="total_area"
            />
          </div>
        </div>
        <div>
          <h4>Total Budget</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.total_budget}
              readOnly
              type="number"
              name="total_budge"
            />
          </div>
        </div>
        <div
          style={
            details?.no_of_floors ? { display: "block" } : { display: "none" }
          }
        >
          <h4>Number of Floors</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.no_of_floors}
              readOnly
              type="number"
              name="no_of_floors"
            />
          </div>
        </div>
        <div
          style={
            details?.no_of_bedrooms ? { display: "block" } : { display: "none" }
          }
        >
          <h4>Number of Bedrooms</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.no_of_bedrooms}
              readOnly
              type="number"
              name="no_of_bedrooms"
            />
          </div>
        </div>

        <div
          style={
            details?.attached_bathrooms
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <h4>Number of Attached Bathrooms</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.attached_bathrooms}
              readOnly
              type="number"
              name="attached_bathrooms"
            />
          </div>
        </div>
      </div>
      <div className={styles.architectDetails}>
        <h3>Architect</h3>
        <div className={styles.architectDetails__bottom}>
          {projectDetails.architect_id?.registered_id?.name ? (
            <>
              <div className={styles.architectDetails__card}>
                <div className={styles.architectDetails__top}>
                  <div className={styles.architectDetails__top__left}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          projectDetails.architect_id?.profilepic
                            ? projectDetails.architect_id?.profilepic
                            : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
                        })`,
                      }}
                      className={styles.architectDetails__card__avatar}
                    ></div>
                    <div className={styles.architectDetails__card__name}>
                      <h3>
                        {projectDetails.architect_id?.registered_id?.name}
                      </h3>
                      <h4></h4>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      viewProfileClick(projectDetails.architect_id?._id)
                    }
                    className={styles.architectDetails__card__viewMore}
                  >
                    View More
                  </div>
                </div>
                <div className={styles.architectDetails__card__bottom}>
                  <p>{projectDetails.architect_id?.bio}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.architectDetails__card}>
                <div className={styles.architectDetails__top}>
                  <div className={styles.architectDetails__top__left}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          projectDetails.architect_id?.profilepic
                            ? projectDetails.architect_id?.profilepic
                            : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
                        })`,
                      }}
                      className={styles.architectDetails__card__avatar}
                    ></div>
                    <div className={styles.architectDetails__card__name}>
                      <h3>
                        {projectDetails.architect_id?.firstname}{" "}
                        {projectDetails.architect_id?.lastname}
                      </h3>
                      <h4></h4>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      viewProfileClick(projectDetails.architect_id?._id)
                    }
                    className={styles.architectDetails__card__viewMore}
                  >
                    View More
                  </div>
                </div>
                <div className={styles.architectDetails__card__bottom}>
                  <p>{projectDetails.architect_id?.bio}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {documents.length <= 0 ? (
        ""
      ) : (
        <div className={styles.architectDetails}>
          <h3>Uploaded Documents</h3>
          <div className={style.fileViewDiv}>
            {documents?.map((items, index) => {
              return (
                <div key={index} className={style.fileViewContainer}>
                  <h5>{items.title}</h5>
                  <div className={style.fileCardContainer}>
                    {items.files.map((file, index) => {
                      return (
                        <div key={index} className={style.fileView}>
                          <>
                            {items.payment_status === true ? (
                              <a
                                className={style.imageContainerClick}
                                target="_blank"
                                rel="noreferrer"
                                download={file.filename}
                                href={file.url}
                                style={
                                  file.isDelete === true
                                    ? { marginTop: "10px" }
                                    : {}
                                }
                              >
                                <Image
                                  className={styles.header__logo}
                                  src="/pdfFile.svg"
                                  alt="Arclif Logo"
                                  width={50}
                                  height={50}
                                />
                              </a>
                            ) : (
                              <div className={style.imageContainerClick}>
                                <Image
                                  className={styles.header__logo}
                                  src="/lock.png"
                                  alt="Arclif Logo"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            )}
                          </>
                          <p>{file.filename}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailedView;
