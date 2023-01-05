/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Image from "next/image";
import Link from "next/link";

import styles from "./main.module.css";
import { useEffect } from "react";
import Request from "./request";
import RequestMobile from "./request-mobile";

export default function OngoingProjectMain({ page, setPage, setProjectRequestPopup }) {
  const [Store] = useContext(StoreContext);

  /* const fileUploadPopup = Store.fileUploadPopup; */
  /* const setOngoingId = Store.setOngoingId; */
  const setFileUploadPopup = Store.setFileUploadPopup;
  const setOngoingPopup = Store.setOngoingPopup;
  const userProjectsNotOrder = Store.userProjects;
  const setArcDashQueue = Store.setArcDashQueue;

  const userProjects = userProjectsNotOrder?.slice(0).reverse();
  // console.log(userProjects);

  const [project, setProject] = useState(false);

  useEffect(() => {
    if (userProjects?.length !== 0) {
      setProject(true);
    } else {
      setProject(false);
    }
  }, [userProjects]);

  /* const moreClick = (val) => {
    if (document.getElementById(`more${val}`).style.display === "block") {
      document.getElementById(`more${val}`).style.display = "none";
    } else {
      document.getElementById(`more${val}`).style.display = "block";
    }
    const concernedElement = document.getElementById(`more${val}`);
    if (val !== null) {
      console.log(val);
      document.addEventListener("mousedown", (event) => {
        if (concernedElement.contains(event.target)) {
          // console.log("Clicked Inside");
          document.getElementById(`more${val}`).style.display = "block";
        } else {
          // console.log("Clicked Outside / Elsewhere");
          document.getElementById(`more${val}`).style.display = "none";
        }
      });
    }
  }; */

  /* const viewMoreClick = (id) => {
    setOngoingPopup(true);
    setOngoingId(id);
  }; */

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div
              onClick={() => (setPage("ongoing"), setArcDashQueue(false))}
              className={page == "ongoing" ? styles.active : ""}
            >
              Ongoing projects
            </div>
            <div
              onClick={() => (setPage("request"), setArcDashQueue(true))}
              className={page == "request" ? styles.active : ""}
            >
              Project Request
            </div>
          </div>
        </div>
        <div className={styles.stwo_outer}>
          <div className={styles.stwo_inner}>
            <div className={styles.stwo_grid_max_outer}>
              {page == "ongoing" ? (
                <>
                  {project ? (
                    <>
                      <div className={styles.stwo_heading_outer}>
                        <div className={styles.stwo_username}>User name</div>
                        <div className={styles.stwo_project_id}>Project id</div>
                        <div className={styles.stwo_starting_date}>Starting date</div>
                        <div className={styles.stwo_upload_file}>Upload file</div>
                        {/* <div className={styles.stwo_suggest_product}>
                          Suggest product
                        </div> */}
                        <div className={styles.stwo_document_folder}>Document folder</div>
                        {/* <div className={styles.stwo_more}>More</div> */}
                      </div>

                      {userProjects?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            {item.creator?.registered_id?.name && item?.status === "ongoing" ? (
                              <div key={i} className={styles.stwo_grid_outer}>
                                <div className={styles.stwo_username}>
                                  <div className={styles.vertical_center}>
                                    <img
                                      src={
                                        item?.creator?.profile_pic
                                          ? item?.creator?.profile_pic
                                          : "/img/ongoing-project/profile.jpg"
                                      }
                                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                                      alt="alt"
                                    />
                                    <span>{item.creator?.registered_id?.name}</span>
                                  </div>
                                </div>
                                <div className={styles.stwo_project_id}>{item?.project_name}</div>
                                <div className={styles.stwo_starting_date}>{item?.starting_date}</div>
                                <div onClick={() => setFileUploadPopup(true)} className={styles.stwo_upload_file}>
                                  <div className={styles.vertical_center}>
                                    <img src="/img/ongoing-project/upload-d.svg" alt="alt" />
                                    <span>Upload now</span>
                                  </div>
                                </div>
                                {/* <div className={styles.stwo_suggest_product}>
                                  <div className={styles.vertical_center}>
                                    <img
                                      src="/img/ongoing-project/send-d.svg"
                                      alt="alt"
                                    />
                                    <span>Send product</span>
                                  </div>
                                </div> */}
                                <Link href={`/project-files/${item._id}`} passHref>
                                  <div className={styles.stwo_document_folder}>
                                    <div className={styles.vertical_center}>
                                      <img src="/img/ongoing-project/file-d.svg" alt="alt" />
                                      <span>Files</span>
                                    </div>
                                  </div>
                                </Link>
                                {/* <div className={styles.stwo_more}>
                                  <div onClick={() => moreClick(i)}>
                                    <img
                                      src="/img/ongoing-project/3dots.svg"
                                      alt="alt"
                                    />
                                  </div>
                                  <div
                                    className={styles.popup_outer}
                                    id={`more${i}`}
                                  >
                                    <div
                                      className={styles.view_more}
                                      onClick={() => viewMoreClick(item)}
                                    >
                                      View more
                                    </div>
                                    <div
                                      onClick={() => moreClick(i)}
                                      className={styles.cancel}
                                    >
                                      Cancel
                                    </div>
                                  </div>
                                </div> */}
                              </div>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className={styles.no_project}>
                        <div className={styles.no_project_image}>
                          <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
                        </div>
                        <h3>Look like there is no ongoing projects is here</h3>
                        <h5>
                          Now the field is blank, so please accept any excellent project request to gain the next
                          project.
                        </h5>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
              {page == "request" ? (
                <>
                  {project ? (
                    <>
                      <div className={styles.stwo_heading_outer}>
                        <div className={styles.stwo_username}>User name</div>
                        <div className={styles.stwo_description}>Description</div>
                        <div className={styles.stwo_total_area}>Total area.sqft</div>
                        <div className={styles.stwo_budget}>Budget</div>
                        {/* <div className={styles.stwo_reference_file}>
                          Reference File
                        </div> */}
                        <div className={styles.stwo_action}>Action</div>
                        {/* <div className={styles.stwo_more}>More</div> */}
                      </div>

                      {userProjects?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            {item.creator?.registered_id?.name && item.status === "started" ? (
                              <Request
                                name={item.creator?.registered_id?.name}
                                avatar={
                                  item?.creator?.profile_pic
                                    ? item?.creator?.profile_pic
                                    : "/img/ongoing-project/profile.jpg"
                                }
                                type={item?.project_type}
                                id={item._id}
                                setPage={setPage}
                                item={item}
                              />
                            ) : (
                              " "
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className={styles.no_project}>
                        <div className={styles.no_project_image}>
                          <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
                        </div>
                        <h3>Look like there is no project request is here</h3>
                        <h5>The field is blank, so please make your profile attractive for the next project.</h5>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </div>

            {/* desktop above , mobile started below */}
            <div className={styles.stwo_mobile_title}>
              {page == "ongoing" ? "Your ongoing projects here" : ""}
              {page == "request" ? "Your have projects request here" : ""}
            </div>
            <div className={styles.stwo_grid_mobile_max_outer}>
              {page == "ongoing" ? (
                <>
                  {project ? (
                    <>
                      {userProjects?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            {item.creator?.registered_id?.name && item.status === "ongoing" ? (
                              <div key={i} className={styles.stwo_mobile_grid_outer}>
                                <div className={styles.top}>
                                  <div className={styles.left}>
                                    <img
                                      src={
                                        item?.creator?.profile_pic
                                          ? item?.creator?.profile_pic
                                          : "/img/ongoing-project/profile.jpg"
                                      }
                                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                                      alt="alt"
                                    />
                                    <div>{item.creator?.registered_id?.name}</div>
                                  </div>
                                  <div onClick={() => setOngoingPopup(true)} className={styles.right}>
                                    <img src="/img/ongoing-project/3dots.svg" alt="alt" />
                                  </div>
                                </div>
                                <div className={styles.content}>
                                  <div className={styles.center}>
                                    <div className={styles.left}>{item?.project_name}</div>
                                    <div className={styles.right}>{item?.starting_date}</div>
                                  </div>
                                  <div className={styles.bottom}>
                                    <div onClick={() => setFileUploadPopup(true)}>
                                      <img src="/img/ongoing-project/upload-m.svg" alt="alt" />
                                      <div>Upload now </div>
                                    </div>
                                    {/*  <div>
                                      <img
                                        src="/img/ongoing-project/send-m.svg"
                                        alt="alt"
                                      />
                                      <div>Send product</div>
                                    </div> */}
                                    <Link href={`/project-files/${item._id}`} passHref>
                                      <div>
                                        <img src="/img/ongoing-project/file-m.svg" alt="alt" />
                                        <div>Files</div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className={styles.no_project}>
                        <div className={styles.no_project_image}>
                          <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
                        </div>
                        <h3>Look like there is no ongoing projects is here</h3>
                        <h5>
                          Now the field is blank, so please accept any excellent project request to gain the next
                          project.
                        </h5>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
              {page == "request" ? (
                <>
                  {project ? (
                    <>
                      {userProjects?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            {item.creator?.registered_id?.name && item.status === "started" ? (
                              <RequestMobile
                                name={item.creator?.registered_id?.name}
                                avatar={
                                  item?.creator?.profile_pic
                                    ? item?.creator?.profile_pic
                                    : "/img/ongoing-project/profile.jpg"
                                }
                                type={item?.project_type}
                                id={item._id}
                                item={item}
                                setPage={setPage}
                              />
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className={styles.no_project}>
                        <div className={styles.no_project_image}>
                          <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
                        </div>
                        <h3>Look like there is no project request is here</h3>
                        <h5>The field is blank, so please make your profile attractive for the next project.</h5>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
