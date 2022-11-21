import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

import styles from "./image-grid.module.css";

export default function AgrihaImageGrid({ allProjectSliced }) {
  // console.log(allProjectSliced);
  return (
    <>
      <div className={styles.grid_max_outer}>
        {allProjectSliced.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={styles.grid_outer}>
                {item[0] ? (
                  <Link href={`/project-details/${item[0]?._id}`}>
                    <div className={styles.one_outer}>
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
                            <img src="/img/landing/arrow-right.svg" alt="view more" />
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
                          <div>{item[0]?.architect_id?.firstname + " " + item[0]?.architect_id?.lastname}</div>
                          <div>Rem Ipsum is simmy.Ad ...</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                {item[1] ? (
                  <Link href={`/project-details/${item[1]?._id}`}>
                    <div className={styles.two_outer}>
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
                            <img src="/img/landing/arrow-right.svg" alt="view more" />
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
                          <div>{item[0]?.architect_id?.firstname + " " + item[0]?.architect_id?.lastname}</div>
                          <div>Rem Ipsum is simmy.Ad ...</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                {item[2] ? (
                  <Link href={`/project-details/${item[2]?._id}`}>
                    <div className={styles.three_outer}>
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
                            <img src="/img/landing/arrow-right.svg" alt="view more" />
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
                          <div>{item[0]?.architect_id?.firstname + " " + item[0]?.architect_id?.lastname}</div>
                          <div>Rem Ipsum is simmy.Ad ...</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                {item[3] ? (
                  <Link href={`/project-details/${item[3]?._id}`}>
                    <div className={styles.four_outer}>
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
                            <img src="/img/landing/arrow-right.svg" alt="view more" />
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
                          <div>{item[0]?.architect_id?.firstname + " " + item[0]?.architect_id?.lastname}</div>
                          <div>Rem Ipsum is simmy.Ad ...</div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
