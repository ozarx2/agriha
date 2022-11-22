/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./RequirementsMain.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

const FileUploadMain = () => {
  const goToUserDash = () => {
    window.location.href = "/dashboard";
  };

  /* Upload Site plan */
  const [percent, setPercent] = useState(0);
  const [sitePlan, setSitePlan] = useState("");

  function handleUploadSitePLan(img) {
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
      alert("Cannot add more than 6 pictures");
    }
  };

  const uploadThumbnail = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUploadThumb(event.target.files[0]);
    }
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
                  <div className={styles.uploadButton}>
                    Upload
                    <img src="/img/requirement/upload.svg" alt="" />
                  </div>
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
                  <div className={styles.uploadButton}>
                    Upload
                    <img src="/img/requirement/upload.svg" alt="" />
                  </div>
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
                  <div className={styles.uploadButton}>
                    Upload
                    <img src="/img/requirement/upload.svg" alt="" />
                  </div>
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
