/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

import styles from "./image-grid.module.css";

export default function AgrihaImageGrid({ allProjectSliced }) {
  const gotoProjectDetail = (id) => {
    window.location.href = `/project-details/${id}`;
  };
  return (
    <>
      <div className={styles.grid_max_outer}>
        {allProjectSliced.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={styles.grid_outer}>
                {item[0] ? (
                  <div
                    className={styles.one_outer}
                    onClick={() => gotoProjectDetail(item[0]?._id)}
                  >
                    <div className={styles.img_out}>
                      <img
                        className={styles.project_img}
                        src={
                          item[0]?.thumbnail
                            ? item[0]?.thumbnail
                            : item[0]?.Image[0]
                            ? item[0]?.Image[0]
                            : "/img/landing/nophoto.jpg"
                        }
                        alt="project img"
                      />
                      <div className={styles.project_hover}>
                        <div className={styles.center}>
                          <div className={styles.text}>View more</div>
                          <img
                            src="/img/landing/arrow-right.svg"
                            alt="view more"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.project_title}>
                      <img
                        src={
                          item[0]?.architect_id?.profilepic
                            ? item[0]?.architect_id?.profilepic
                            : "/img/landing/profile_img.svg"
                        }
                        alt="profile"
                      />
                      <div className={styles.right}>
                        <div>
                          {item[0]?.architect_id?.firstname +
                            " " +
                            item[0]?.architect_id?.lastname}
                        </div>
                        <div>{item[0]?.projectname}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {item[1] ? (
                  <div
                    className={styles.two_outer}
                    onClick={() => gotoProjectDetail(item[1]?._id)}
                  >
                    <div className={styles.img_out}>
                      <img
                        className={styles.project_img}
                        src={
                          item[1]?.thumbnail
                            ? item[1]?.thumbnail
                            : item[1]?.Image[0]
                            ? item[1]?.Image[0]
                            : "/img/landing/nophoto.jpg"
                        }
                        alt="project img"
                      />
                      <div className={styles.project_hover}>
                        <div className={styles.center}>
                          <div className={styles.text}>View more</div>
                          <img
                            src="/img/landing/arrow-right.svg"
                            alt="view more"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.project_title}>
                      <img
                        src={
                          item[1]?.architect_id?.profilepic
                            ? item[1]?.architect_id?.profilepic
                            : "/img/landing/profile_img.svg"
                        }
                        alt="profile"
                      />
                      <div className={styles.right}>
                        <div>
                          {item[1]?.architect_id?.firstname +
                            " " +
                            item[1]?.architect_id?.lastname}
                        </div>
                        <div>{item[1]?.projectname}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {item[2] ? (
                  <div
                    className={styles.three_outer}
                    onClick={() => gotoProjectDetail(item[2]?._id)}
                  >
                    <div className={styles.img_out}>
                      <img
                        className={styles.project_img}
                        src={
                          item[2]?.thumbnail
                            ? item[2]?.thumbnail
                            : item[2]?.Image[0]
                            ? item[2]?.Image[0]
                            : "/img/landing/nophoto.jpg"
                        }
                        alt="project img"
                      />
                      <div className={styles.project_hover}>
                        <div className={styles.center}>
                          <div className={styles.text}>View more</div>
                          <img
                            src="/img/landing/arrow-right.svg"
                            alt="view more"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.project_title}>
                      <img
                        src={
                          item[2]?.architect_id?.profilepic
                            ? item[2]?.architect_id?.profilepic
                            : "/img/landing/profile_img.svg"
                        }
                        alt="profile"
                      />
                      <div className={styles.right}>
                        <div>
                          {item[2]?.architect_id?.firstname +
                            " " +
                            item[2]?.architect_id?.lastname}
                        </div>
                        <div>{item[2].projectname}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {item[3] ? (
                  <div
                    className={styles.four_outer}
                    onClick={() => gotoProjectDetail(item[3]?._id)}
                  >
                    <div className={styles.img_out}>
                      <img
                        className={styles.project_img}
                        src={
                          item[3]?.thumbnail
                            ? item[3]?.thumbnail
                            : item[3]?.Image[0]
                            ? item[3]?.Image[0]
                            : "/img/landing/nophoto.jpg"
                        }
                        alt="project img"
                      />
                      <div className={styles.project_hover}>
                        <div className={styles.center}>
                          <div className={styles.text}>View more</div>
                          <img
                            src="/img/landing/arrow-right.svg"
                            alt="view more"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.project_title}>
                      <img
                        src={
                          item[3]?.architect_id?.profilepic
                            ? item[3]?.architect_id?.profilepic
                            : "/img/landing/profile_img.svg"
                        }
                        alt="profile"
                      />
                      <div className={styles.right}>
                        <div>
                          {item[3]?.architect_id?.firstname +
                            " " +
                            item[3]?.architect_id?.lastname}
                        </div>
                        <div>{item[3].projectname}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
