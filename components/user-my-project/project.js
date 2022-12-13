/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FnFileFolder from "./folders";
import FnPayment from "./payment";
import FnSuggested from "./suggested";
import FnFileUploadDesk from "./fileuploaddesk";
import FnFileFromArchDesk from "./filefromarch";
import api_url from "../../src/utils/url";

import styles from "./project.module.css";

const FnOngoingProjectUserSide = ({ projects }) => {
  const router = useRouter();

  const [showMore, setShowMore] = useState(false);
  const [selectprojectId, setSelectprojectId] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const toggleBtn = (id) => {
    setShowMore((prevState) => !prevState);
    setSelectprojectId(id);
  };

  async function getUploadFile() {
    const token = localStorage.getItem("userToken");
    const response = await fetch(`${api_url}/fileupload/userfiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      setUploadedFiles(data?.userFile);
    }
  }

  useEffect(() => {
    getUploadFile();
  }, []);

  return (
    <>
      {projects
        .slice(0)
        .reverse()
        .map((items, index) => {
          return (
            <div className={styles.mainSection} key={index}>
              <div>
                <div className={styles.ongoingProjectSection}>
                  <div className={styles.projectNameSection}>
                    <div className={styles.projectName}>Project {index + 1} </div>
                    <div className={styles.projectId}>{items.project_name}</div>
                  </div>
                  <div className={styles.showMoreBtnSection}>
                    {items.bid ? <div className={styles.bid}>Bid</div> : ""}
                    <div id="less" className={styles.showMore} onClick={() => toggleBtn(items._id)}>
                      {showMore && selectprojectId === items._id ? "Show Less" : "Show More"}

                      {showMore && selectprojectId === items._id ? (
                        <img src="/img/my-project-user/showup.svg" alt="up.svg" />
                      ) : (
                        <img src="/img/my-project-user/showdown.svg" alt="down.svg" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.onGoingProjSectionMain}>
                  <div className={styles.secOne}>
                    {items.architect_id ? (
                      <div className={styles.profileDpNameSection}>
                        <Link href={`/user-architect-about/${items?.architect_id?._id}`} passHref>
                          <div className={styles.profileNameSec}>
                            <img
                              src={
                                items?.architect_id?.profilepic
                                  ? items?.architect_id?.profilepic
                                  : "/img/my-project-user/profile.svg"
                              }
                              alt="profile.svg"
                              className={styles.profileNameSecImg}
                            />
                            <div>{items?.architect_id?.firstname}</div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className={styles.profileDpNameSection}>
                        <div className={styles.profileNameSec}>
                          <div>Architect not selected</div>
                        </div>
                      </div>
                    )}

                    <div className={styles.profileStatusSection}>
                      <div className={styles.profileStatusLeft}>
                        <div className={styles.profileStatus}>Status:</div>
                        <div className={styles.profileStatus}>Started on:</div>
                        <div className={styles.profileStatus}>Current stage:</div>
                        <div className={styles.profileStatus}>Payment status:</div>
                      </div>
                      <div className={styles.profileStatusRight}>
                        <div className={styles.profileStatus}>{items?.status}</div>
                        <div className={styles.profileStatus}>{items?.starting_date}</div>
                        <div className={styles.profileStatus}>{items?.status}</div>
                        <div className={styles.profileStatus}>Pending</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.secTwo}>
                    <FnFileUploadDesk projectId={items._id} allUploadedFiles={uploadedFiles} />
                  </div>
                  <div className={styles.secThree}>
                    <FnFileFromArchDesk />
                  </div>
                </div>
                <div className={styles.projDetails} id="projDetails">
                  {showMore && selectprojectId === items._id ? (
                    <>
                      <FnSuggested />
                      <FnPayment />
                      <FnFileFolder />{" "}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default FnOngoingProjectUserSide;
