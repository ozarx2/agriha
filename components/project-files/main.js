/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import styles from "./main.module.css";

export default function ProjectFilesMain({ setFolderPopup }) {
  const [files, setFiles] = useState(true);
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const userProjects = Store.userProjects;
  const setProjectId = Store.setProjectId;

  const allDocuments = userProjects?.filter((res) => res.status === "ongoing");

  useEffect(() => {
    if (userProjects?.length <= 0) {
      setFiles(false);
    } else {
      setFiles(true);
    }
  }, [userProjects]);

  const filePopup = (id) => {
    // setFolderPopup(true);
    router.push(`/project-files/${id._id}`);
    setProjectId(id);
  };

  // console.log(allDocuments);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div className={styles.left}>Folders</div>
            {/* <div className={styles.right}>
              <img src="/img/architect-dashboard/sort.svg" alt="sort" />
              <span>Sort list</span>
            </div> */}
          </div>
        </div>
        <div className={styles.stwo_outer}>
          <div className={styles.stwo_inner}>
            <div className={styles.folder_max_outer}>
              {files ? (
                <>
                  {allDocuments
                    ?.slice(0)
                    .reverse()
                    ?.map((item, i) => {
                      return (
                        <div key={i} onClick={() => filePopup(item)} className={styles.folder_all_outer}>
                          <div className={styles.full}>
                            <img
                              src={item?.thumbnail ? item?.thumbnail : "/img/landing/nophoto.jpg"}
                              onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                              alt="alt"
                            />
                          </div>
                          <div className={styles.folder_outer}>
                            <div className={styles.left}>
                              <img src="/img/architect-dashboard/folder-files.svg" alt="folder" />
                              <span>{item.project_name}</span>
                            </div>
                            <div className={styles.right}>
                              <div className={styles.progress}>
                                {item.status === "completed" ? (
                                  <img src="/img/architect-dashboard/p-c.svg" alt="p-c" />
                                ) : (
                                  <img src="/img/architect-dashboard/p-nc.svg" alt="p-nc" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className={styles.no_files}>
                  <h3>“No files”</h3>
                  <h5>Sorry, you have no files from home seeker</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
