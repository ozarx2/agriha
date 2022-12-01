/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StoreContext } from "../../components/StoreContext";
import storage from "../../firebase";
import FnFileFolder from "./folders";
import FnPayment from "./payment";
import FnSuggested from "./suggested";
import api_url from "../../src/utils/url";
import { Upload } from "antd";
const { Dragger } = Upload;

import styles from "./project.module.css";
import FnFileUploadDesk from "./fileuploaddesk";
import FnFileFromArchDesk from "./filefromarch";

const FnOngoingProjectUserSide = () => {
  const router = useRouter();

  const [showMore, setShowMore] = useState(false);
  const [selectprojectId, setSelectprojectId] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState([]);
  const toggleBtn = (id) => {
    setShowMore((prevState) => !prevState);
    setSelectprojectId(id);
  };
  const handler = (e) => {
    setDescription(e.target.value);
  };

  // submit user file
  const handleSubmit = (id) => {
    // console.log(description);
    // console.log(id);
  };
  async function getSingleProject() {
    const token = localStorage.getItem("userToken");
    const res = await fetch("https://agriha-server-dot-agriha-services.uc.r.appspot.com/projects/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    setProject(data.projects);
  }
  // console.log(project);
  useEffect(() => {
    getSingleProject();
    // getProject();
  }, []);

  return (
    <>
      <div className={styles.mainSection}>
        {project?.map((items, key) => {
          return (
            <>
              <div key={key} className={styles.ongoingProjectSection}>
                <div className={styles.projectNameSection}>
                  <div className={styles.projectName}>My Project</div>
                  <div className={styles.projectId}>{items?.project_name}</div>
                </div>
                <div className={styles.showMoreBtnSection}>
                  <div className={styles.suggestion}>
                    <div>
                      <img src="/img/my-project-user/suggestion.svg" alt="suggestion.svg" /> Suggestion
                    </div>
                  </div>

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
                  <div className={styles.profileDpNameSection}>
                    <Link href={`/user-architect-about/${items?.architect_id?._id}`} passHref>
                      <div className={styles.profileNameSec}>
                        <img
                          src={items?.architect_id?.profilepic}
                          // src="/img/my-project-user/profile.svg"
                          alt="profile.svg"
                          className={styles.profileNameSecImg}
                        />
                        <div>{items?.architect_id?.firstname}</div>
                      </div>
                    </Link>
                  </div>

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
                  <FnFileUploadDesk projectId={items._id} />
                </div>
                <div className={styles.secThree}>
                  <FnFileFromArchDesk />
                </div>
              </div>
              <div className={styles.projDetails} id="projDetails">
                {showMore && selectprojectId === items._id ? (
                  <div className={styles.projDetails} id="projDetails">
                    <FnSuggested />
                    <FnPayment />
                    <FnFileFolder />
                  </div>
                ) : null}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FnOngoingProjectUserSide;
