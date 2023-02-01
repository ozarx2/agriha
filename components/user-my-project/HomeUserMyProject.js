import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./UserMyProjectsSingle.module.css";

const HomeUserMyProject = ({ projectDetails }) => {
  const router = useRouter();

  const goToArchProfile = (id) => {
    router.push(`/user-architect-about/${id}`);
  };

  const [refImageShow, setRefImageShow] = useState(false);

  const fnRefImageShow = () => {
    setRefImageShow(true);
  };

  return (
    <>
      <div className={styles.container_body_top}>
        <div className={styles.container_body_top_left}>
          <p>{projectDetails?.project_name}</p>
          <div className={styles.title_project}>
            {projectDetails?.project_type}
            <p>
              {projectDetails?.project_requirements[0]?.area} <span>sqft</span>
            </p>
          </div>
        </div>
        <div className={styles.container_body_top_right}>
          <div className={styles.architect_projectCard_left}>
            <img
              onClick={() => goToArchProfile(projectDetails.architect_id._id)}
              onError={(e) => (e.target.src = "/img/user-my-project/no-image.png")}
              src={
                projectDetails.architect_id?.profilepic
                  ? projectDetails.architect_id.profilepic
                  : "/img/user-my-project/profile-demo.svg"
              }
              alt=""
            />
            <p onClick={() => goToArchProfile(projectDetails.architect_id._id)}>
              {projectDetails.architect_id?.firstname}
            </p>
          </div>
          <a onClick={() => goToArchProfile(projectDetails.architect_id._id)}>Show architect</a>
        </div>
      </div>
      <div className={styles.container_body_bottom}>
        <div className={styles.container_body_bottom_section}>
          <div className={styles.container_body_bottom_table}>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Project Code</p>
                <span></span>
              </div>
              <p>{projectDetails?.project_name}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Location </p>
                <span></span>
              </div>
              <p>{projectDetails?.project_requirements[0]?.location}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Budget </p>
                <span></span>
              </div>
              <p>₹ {projectDetails?.project_requirements[0]?.budget}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Project type</p>
                <span></span>
              </div>
              <p>{projectDetails?.project_type}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Starting date</p>
                <span></span>
              </div>
              <p>{projectDetails?.starting_date}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Status</p>
                <span></span>
              </div>
              <p>{projectDetails?.status}</p>
            </div>
          </div>
          <div className={styles.referencImage_button_container}>
            <div className={styles.referencImage_button} onClick={fnRefImageShow}>
              Reference image
            </div>
          </div>
        </div>
        <div className={styles.container_body_bottom_section}>
          <div className={styles.container_body_bottom_table}>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Project area</p>
                <span></span>
              </div>
              <p>{projectDetails?.project_requirements[0]?.area} SQFT</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Rf Images</p>
                <span></span>
              </div>
              <p>{projectDetails?.reference_images.length}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Agent </p>
                <span></span>
              </div>
              <p>NILL</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Plan</p>
                <span></span>
              </div>
              <p>{projectDetails?.plan_id?.plan_name ? projectDetails?.plan_id?.plan_name : "NILL"}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Payment status</p>
                <span></span>
              </div>
              <p>{projectDetails?.payment_status ? projectDetails?.payment_status : "unpaid"}</p>
            </div>
            <div className={styles.table_row}>
              <div className={styles.table_row_left}>
                <p>Number of files</p>
                <span></span>
              </div>
              <p>{projectDetails?.files ? projectDetails?.files.length : 0}</p>
            </div>
          </div>
          <div className={styles.contact_button_container}>
            <div className={styles.contact_button} onClick={fnRefImageShow}>
              Contact us
            </div>
          </div>
        </div>
      </div>
      {refImageShow ? (
        <div className={styles.referanceImagesContainer}>
          {projectDetails?.reference_images.map((item, index) => {
            return <img key={index} src={item} />;
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeUserMyProject;
