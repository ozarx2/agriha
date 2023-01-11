/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { StoreContext } from "../../components/StoreContext";
import styles from "./sfour.module.css";

export default function FnSFour() {
  const [Store] = useContext(StoreContext);

  const userProjects = Store.userProjects;
  const setAddProject = Store.setAddProject;
  const setFileUploadPopup = Store.setFileUploadPopup;
  const setFileUploadId = Store.setFileUploadId;
  /* const setOngoingPopup = Store.setOngoingPopup; */

  const [ongoingProject, setOngoingProject] = useState(true);

  const ongoing = userProjects?.filter((res) => res.status === "ongoing");
  // console.log(userProjects);

  useEffect(() => {
    if (userProjects?.length !== 0) {
      setOngoingProject(true);
    } else {
      setOngoingProject(false);
    }
  }, [userProjects]);

  const uploadClick = (id) => {
    setFileUploadPopup(true);
    setFileUploadId(id);
  };

  return (
    <>
      <div className={styles.sfour_outer}>
        <div className={styles.sfour_inner}>
          <div className={styles.title}>
            <div className={styles.left}>
              Ongoing Project
              <span className={styles.dot}>
                <Image src="/img/architect-dashboard/dot.svg" alt="dot" width={3} height={3} />
              </span>
              <span className={styles.number}>{ongoing?.length}</span>
            </div>
            <Link href="/ongoing-project" passHref>
              <div className={styles.right}>View all</div>
            </Link>
          </div>
          {ongoingProject ? (
            <div className={styles.stwo_grid_mobile_max_outer}>
              {ongoing?.map((item, index) => {
                return (
                  <div key={index} className={styles.stwo_mobile_grid_outer}>
                    <div className={styles.top}>
                      <div className={styles.left}>
                        <img
                          src={
                            item?.creator?.profile_pic ? item?.creator?.profile_pic : "/img/ongoing-project/profile.jpg"
                          }
                          onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                          alt="alt"
                        />
                        <div>{item?.creator?.name}</div>
                      </div>
                      {/* {console.log(item)} */}
                      <Link href={`/ongoing-project/${item._id}`} passHref>
                        <div className={styles.right}>
                          <img src="/img/ongoing-project/3dots.svg" alt="alt" />
                        </div>
                      </Link>
                      {/* <div
                        onClick={() => setOngoingPopup(true)}
                        className={styles.right}
                      >
                        <img src="/img/ongoing-project/3dots.svg" alt="alt" />
                      </div> */}
                    </div>
                    <div className={styles.content}>
                      <div className={styles.center}>
                        <div className={styles.left}>{item?.project_name}</div>
                        <div className={styles.right}>{item?.starting_date}</div>
                      </div>
                      <div className={styles.bottom}>
                        <div onClick={() => uploadClick(item?._id)}>
                          <img src="/img/ongoing-project/upload-m.svg" alt="alt" />
                          <div>Upload now </div>
                        </div>
                        {/* <div>
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
                );
              })}
            </div>
          ) : (
            <div className={styles.no_project}>
              <div className={styles.no_project_image}>
                <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
              </div>
              <h3>Look like there is no projects is here</h3>
              <h5>Now field is blank, so please create your project is here</h5>
              <button onClick={() => setAddProject(true)}>Carete now</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
