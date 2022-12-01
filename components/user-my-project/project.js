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

const FnOngoingProjectUserSide = () => {
  const [Store] = useContext(StoreContext);
  const files = Store.files;
  const setFiles = Store.setFiles;

  const router = useRouter();

  const [showMore, setShowMore] = useState(false);
  const [description, setDescription] = useState("");
  const [project, setProject] = useState([]);
  const toggleBtn = () => {
    setShowMore((prevState) => !prevState);
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

  /* Upload project images */
  const [projectImages, setProjectImages] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

  function handleUploadProject(img) {
    if (!img) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/projects/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentProject(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addImages(url);
        });
      }
    );
  }

  /* Multiple Image Uploading */
  var fileObj = [];
  var fileArray = [];

  const uploadMultipleFiles = (e) => {
    if (e.target.files.length <= 30) {
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
        setFiles((files) => [...files, { url: URL.createObjectURL(fileObj[0][i]), file: fileObj[0][i] }]);
      }
    } else {
      alert("Cannot add more than 30 pictures");
    }
  };

  const uploadProject = () => {
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      handleUploadProject(temp[i].file);
    }
  };

  const singleDeleteImage = (i) => {
    let temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
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
                      <img src="/img/my-project-user/suggestion.svg" alt="suggestion.svg" /> Suggestion
                    </div>
                  </div>

                  <div id="less" className={styles.showMore} onClick={toggleBtn}>
                    {showMore ? "Show Less" : "Show More"}

                    {showMore ? (
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
                  <div className={styles.fileUploadSectionArch}>
                    <div>File upload to Architect</div>
                  </div>
                  <div className={styles.uploadDescSec}>
                    <input
                      type="text"
                      className={styles.uploadDesc}
                      // value={description}
                      onChange={handler}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className={styles.dragDropSec}>
                    {/* <Dragger {...props}>
                      Drag & drop <a href="">Browse</a>
                    </Dragger> */}
                    <input
                      className={styles.custom_file_input}
                      type="file"
                      multiple
                      onChange={uploadMultipleFiles}
                      placeholder="No file selected"
                      accept="application/pdf"
                    />
                    <div className={styles.dragDrop}>
                      Drag & drop <a href="">Browse</a>
                    </div>
                    <div className={styles.fileOuter}>
                      {files.map((file, key) => {
                        console.log(file);
                        return (
                          <div key={key} className={styles.file}>
                            <div>
                              <img src="/img/my-project-user/data.svg" />
                              <span>{file.file.name}</span>
                            </div>
                            <span onClick={() => singleDeleteImage(index)}>Delete</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.fileButtonsSec}>
                    <div className={styles.cancelBtn}>cancel</div>
                    <div className={styles.uploadBtn} onClick={() => uploadProject()}>
                      <img src="/img/my-project-user/upload.svg" alt="upload.svg" className={styles.upload} />
                      <span onClick={() => handleSubmit(items._id)}>Upload</span>
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
                      <img src="/img/my-project-user/unlock.svg" alt="unlock.svg" />
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
