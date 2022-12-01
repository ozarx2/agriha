/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import FnFileFolder from "./folders";
import FnPayment from "./payment";
import styles from "./project.module.css";
import FnSuggested from "./suggested";
import api_url from "../../src/utils/url";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const FnOngoingProjectUserSide = () => {
  const [showMore, setShowMore] = useState(false);
  const [description, setDescription] = useState("");
  const [project, setProject] = useState([]);
  const toggleBtn = () => {
    setShowMore((prevState) => !prevState);
  };
  const handler = (e) => {
    setDescription(e.target.value);
  };
  async function getSingleProject() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(
      "https://agriha-server-dot-agriha-services.uc.r.appspot.com/projects/view",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setProject(data.projects);
    // const res = await fetch(
    //   `https://agriha-server-dot-agriha-services.uc.r.appspot.com/projects/view`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // const data = await res.json();
    // setProject(data.projects);
  }
  console.log(project);
  useEffect(() => {
    getSingleProject();
    // getProject();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
                      <img
                        src="/img/my-project-user/suggestion.svg"
                        alt="suggestion.svg"
                      />{" "}
                      Suggestion
                    </div>
                  </div>

                  <div
                    id="less"
                    className={styles.showMore}
                    onClick={toggleBtn}
                  >
                    {showMore ? "Show Less" : "Show More"}

                    {showMore ? (
                      <img src="/img/my-project-user/showup.svg" alt="up.svg" />
                    ) : (
                      <img
                        src="/img/my-project-user/showdown.svg"
                        alt="down.svg"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.onGoingProjSectionMain}>
                <div className={styles.secOne}>
                  <div className={styles.profileDpNameSection}>
                    <div className={styles.profileNameSec}>
                      <img
                        src={items?.architect_id?.profilepic}
                        // src="/img/my-project-user/profile.svg"
                        alt="profile.svg"
                        className={styles.profileNameSecImg}
                      />
                      <div>{items?.architect_id?.firstname}</div>
                    </div>
                  </div>

                  <div className={styles.profileStatusSection}>
                    <div className={styles.profileStatusLeft}>
                      <div className={styles.profileStatus}>Status:</div>
                      <div className={styles.profileStatus}>Started on:</div>
                      <div className={styles.profileStatus}>Current stage:</div>
                      <div className={styles.profileStatus}>
                        Payment status:
                      </div>
                    </div>
                    <div className={styles.profileStatusRight}>
                      <div className={styles.profileStatus}>
                        {items?.status}
                      </div>
                      <div className={styles.profileStatus}>
                        {items?.starting_date}
                      </div>
                      <div className={styles.profileStatus}>
                        {items?.status}
                      </div>
                      <div className={styles.profileStatus}>Pending</div>
                    </div>
                  </div>
                </div>
                <div className={styles.secTwo}>
                  <div className={styles.fileUploadSectionArch}>
                    <div>File upload to Architect</div>
                  </div>
                  <div className={styles.uploadDescSec}>
                    <input
                      type="text"
                      className={styles.uploadDesc}
                      value={description}
                      onChange={handler}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className={styles.dragDropSec}>
                    <Dragger {...props}>
                      Drag & drop <a href="">Browse</a>
                    </Dragger>
                    {/* <div className={styles.dragDrop}>
                      Drag & drop <a href="">Browse</a>{" "}
                    </div> */}
                  </div>
                  <div className={styles.fileButtonsSec}>
                    <div className={styles.cancelBtn}>cancel</div>
                    <div className={styles.uploadBtn}>
                      <img
                        src="/img/my-project-user/upload.svg"
                        alt="upload.svg"
                        className={styles.upload}
                      />
                      <span>Upload</span>
                    </div>
                  </div>
                </div>
                <div className={styles.secThree}>
                  <div className={styles.fileTitle}>File from Architect</div>
                  <div className={styles.archFilesMainSec}>
                    <div className={styles.fileList}>
                      <img src="/img/my-project-user/data.svg" alt="data.svg" />
                      <span>Photograph.jpg</span>
                    </div>
                    <div className={styles.dataDate}>27/10/2022</div>
                    <div className={styles.dataLock}>
                      <img
                        src="/img/my-project-user/unlock.svg"
                        alt="unlock.svg"
                      />
                      <span>Unlock file</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.projDetails} id="projDetails">
                {showMore ? (
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
