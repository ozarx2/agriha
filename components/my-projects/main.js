/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.css";
import { useEffect } from "react";

export default function MyProjectsMain({ page, setPage }) {
  const [Store] = useContext(StoreContext);

  const setAddProject = Store.setAddProject;
  const projects = Store.projects;

  const [project, setProject] = useState(false);

  useEffect(() => {
    if (projects.length !== 0) {
      setProject(true);
    } else {
      setProject(false);
    }
  }, [projects]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div
              onClick={() => setPage("recent")}
              className={page == "recent" ? styles.active : ""}
            >
              Recent project
            </div>
          </div>
        </div>
        <div className={styles.stwo_outer}>
          <div className={styles.stwo_inner}>
            <div className={styles.stwo_title}>
              {page == "recent" ? "Your recent project works is here" : ""}
              {page == "agriha" ? "Agriha projects only here" : ""}
            </div>
            <div className={styles.stwo_grid_max_outer}>
              {page == "recent" ? (
                <>
                  {project ? (
                    <>
                      {projects?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Link href={`/my-projects/${item._id}`} passHref>
                              <div className={styles.stwo_grid_outer}>
                                <div className={styles.stwo_grid_image}>
                                  <img
                                    src={
                                      item?.thumbnail
                                        ? item?.thumbnail
                                        : item?.Image[0]
                                        ? item?.Image[0]
                                        : "/img/architect-dashboard/noImg.jpeg"
                                    }
                                    alt="alt"
                                  />
                                </div>
                                <div className={styles.stwo_grid_title}>
                                  <h3>{item.projectname}</h3>
                                  <p>
                                    {item.location} | {item.projectarea}
                                  </p>
                                </div>
                              </div>
                            </Link>
                            {(i + 1) % 4 === 0 ? (
                              <div className={styles.border_bottom}></div>
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
                          <Image
                            src="/img/architect-dashboard/no.svg"
                            alt="no_project_image"
                            width={115}
                            height={85}
                          />
                        </div>
                        <h3>Look like there is no recent projects is here</h3>
                        <h5>
                          Now field is blank, so please create your project is
                          here
                        </h5>
                        <button onClick={() => setAddProject(true)}>
                          Carete now
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
              {page == "agriha" ? (
                <>
                  {project ? (
                    <>
                      {Array.apply(null, { length: 5 }).map((e, i) => (
                        <React.Fragment key={i}>
                          <Link href={`/my-projects/${i}`} passHref>
                            <div className={styles.stwo_grid_outer}>
                              <div className={styles.stwo_grid_image}>
                                <img
                                  src="/img/architect-dashboard/project/1.png"
                                  alt="alt"
                                />
                              </div>
                              <div className={styles.stwo_grid_title}>
                                <h3>Agriha Project name</h3>
                                <p>Malappuram kerala</p>
                              </div>
                            </div>
                          </Link>
                          {(i + 1) % 4 === 0 ? (
                            <div className={styles.border_bottom}></div>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className={styles.no_project}>
                        <div className={styles.no_project_image}>
                          <Image
                            src="/img/architect-dashboard/no.svg"
                            alt="no_project_image"
                            width={115}
                            height={85}
                          />
                        </div>
                        <h3>Look like there is no agriha projects is here</h3>
                        <h5>
                          Now field is blank, so please create your project is
                          here
                        </h5>
                        <button onClick={() => setAddProject(true)}>
                          Carete now
                        </button>
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
