/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./RequirementsMain.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import api_url from "../../src/utils/url";

const FileUploadMain = () => {
  const goToUserDash = () => {
    window.location.href = "/dashboard";
  };

  /* Upload Site plan */
  const [percent, setPercent] = useState(0);
  const [sitePlan, setSitePlan] = useState("");

  function handleUploadSitePLan(img) {
    console.log("uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/siteplan/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setSitePlan(url);
        });
      }
    );
  }

  const uploadSitePlan = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUploadSitePLan(event.target.files[0]);
    }
  };

  /* Upload thumbanil */
  const [percentThumb, setPercentThumb] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  function handleUploadThumb(img) {
    console.log("uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/project/thumb/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercentThumb(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setThumbnail(url);
        });
      }
    );
  }

  /* upload referance images */
  const [projectImages, setProjectImages] = useState([]);

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

  const [percentProject, setPercentProject] = useState(0);

  function handleUploadReferanceImages(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/referanceImages/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercentProject(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          addImages(url);
        });
      }
    );
  }

  const [files, setFiles] = useState([]);

  var fileObj = [];
  var fileArray = [];

  const uploadReferanceImages = (e) => {
    console.log("access input post");
    if (e.target.files.length <= 3) {
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        handleUploadReferanceImages(fileObj[0][i]);
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setFiles(fileArray);
      console.log(fileArray);
    } else {
      alert("Cannot add more than 3 pictures");
    }
  };

  const uploadThumbnail = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUploadThumb(event.target.files[0]);
    }
  };

  /* upload siteplan */
  const handleSubmitSiteplan = () => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          site_plan: sitePlan,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        console.log("site plan uploaded");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong please try again");
      });
  };

  /* upload referrance images */
  const handleSubmitRefImages = () => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          reference_images: projectImages,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        console.log("refrerance uploaded");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong please try again");
      });
  };

  /* upload referrance images */
  const handleSubmitThumbnail = () => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          thumbnail: thumbnail,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        console.log("thumbnail uploaded");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong please try again");
      });
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.top__main_inner}>
            <div className={styles.left__main_inner}>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>1</span>
                  <p>Basic Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>2</span>
                  <p>Secondary Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>3</span>
                  <p>Choose Plan</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>File Upload</p>
              <div className={styles.inputRow_container_fileUpload}>
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    <input
                      type="file"
                      onChange={uploadSitePlan}
                      accept="application/pdf"
                      id="siteplan"
                    />
                    <div className={styles.inputRef}>Choose file</div>
                    <p>Upload Site Plan</p>
                  </div>
                  {sitePlan !== "" ? (
                    <div
                      className={styles.uploadButtonActive}
                      onClick={handleSubmitSiteplan}
                    >
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  ) : (
                    <div className={styles.uploadButton}>
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  )}
                </div>
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    <input
                      id="referanceImg"
                      type="file"
                      multiple
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={uploadReferanceImages}
                    />
                    <div className={styles.inputRef}>Choose files</div>
                    <p>Upload referance images (maximum: 3)</p>
                  </div>
                  {projectImages.length !== 0 ? (
                    <div
                      className={styles.uploadButtonActive}
                      onClick={handleSubmitRefImages}
                    >
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  ) : (
                    <div className={styles.uploadButton}>
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  )}
                </div>
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    <input
                      id="thumbnailImg"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={uploadThumbnail}
                    />
                    <div className={styles.inputRef}>Choose file</div>
                    <p>Upload thumbnail image</p>
                  </div>
                  {thumbnail !== "" ? (
                    <div
                      className={styles.uploadButtonActive}
                      onClick={handleSubmitThumbnail}
                    >
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  ) : (
                    <div className={styles.uploadButton}>
                      Upload
                      <img src="/img/requirement/upload.svg" alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToUserDash}>
              Send Requirement
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadMain;
