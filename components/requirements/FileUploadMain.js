/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import api_url from "../../src/utils/url";
import { PulseLoader } from "react-spinners";
import Link from "next/link";

import styles from "./RequirementsMain.module.css";

const FileUploadMain = () => {
  const [sitePlanDetails, setSitePlanDetails] = useState([]);
  const [referanceImageDetails, setReferanceImageDetails] = useState([]);
  const [thumbnailDetails, setThumbnailDetails] = useState([]);

  const [sitePlanLoading, setSitePlanLoading] = useState(false);
  const [referaceLoading, setReferaceLoading] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const getSitePlan = (e) => {
    setSitePlanDetails(e.target.files[0]);
  };

  const getReferanceImages = (e) => {
    setReferanceImageDetails(e.target.files);
  };

  const getThumbnail = (e) => {
    setThumbnailDetails(e.target.files[0]);
  };

  /* SITEPLAN UPLOADING */
  const [percent, setPercent] = useState(0);
  const [sitePlan, setSitePlan] = useState("");

  const handleSubmitSiteplan = (file) => {
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
          site_plan: file,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setSitePlanLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleUploadSitePLan(img) {
    setSitePlanLoading(true);
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/siteplan/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setSitePlan(url);
          handleSubmitSiteplan(url);
        });
      }
    );
  }

  /* REFERANCE IMAGES UPLOADING */
  const [projectImages, setProjectImages] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

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
        // console.log(response.data);
        // console.log("refrerance uploaded");
        setReferaceLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

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
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

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

  const uploadReferanceImages = (data) => {
    setReferaceLoading(true);
    fileObj.push(data);
    for (let i = 0; i < fileObj[0].length; i++) {
      handleUploadReferanceImages(fileObj[0][i]);
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFiles(fileArray);
  };

  useEffect(() => {
    if (files.length === projectImages.length) {
      handleSubmitRefImages();
    }
  }, [files, projectImages]);

  /* THUMBNAIL UPLOADING */
  const [percentThumb, setPercentThumb] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmitThumbnail = (file) => {
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
          thumbnail: file,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setThumbnailLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleUploadThumb(img) {
    setThumbnailLoading(true);
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/project/thumb/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentThumb(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setThumbnail(url);
          handleSubmitThumbnail(url);
        });
      }
    );
  }

  const goToUserDash = () => {
    setIsLoading(true);
    window.location.href = "/";
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
                    <input type="file" onChange={getSitePlan} accept="application/pdf" id="siteplan" />
                    <div className={styles.inputRef}>Choose file</div>
                    <p>{sitePlanDetails.length === 0 ? "Upload Site Plan" : sitePlanDetails.name}</p>
                  </div>
                  {sitePlanDetails.length !== 0 ? (
                    <div className={styles.uploadButtonActive} onClick={() => handleUploadSitePLan(sitePlanDetails)}>
                      {sitePlanLoading ? (
                        <PulseLoader color="#ffffff" />
                      ) : (
                        <>
                          {sitePlan === "" ? (
                            <>
                              Upload <img src="/img/requirement/upload.svg" alt="" />
                            </>
                          ) : (
                            "Uploaded"
                          )}
                        </>
                      )}
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
                      onChange={getReferanceImages}
                    />
                    <div className={styles.inputRef}>Choose files</div>
                    <p>
                      {referanceImageDetails.length === 0
                        ? "Upload referance images(3)"
                        : referanceImageDetails.length + " " + "Images"}
                    </p>
                  </div>
                  {referanceImageDetails.length !== 0 ? (
                    <div
                      className={styles.uploadButtonActive}
                      onClick={() => uploadReferanceImages(referanceImageDetails)}
                    >
                      {referaceLoading ? (
                        <PulseLoader color="#ffffff" />
                      ) : (
                        <>
                          {projectImages.length === 0 ? (
                            <>
                              Upload <img src="/img/requirement/upload.svg" alt="" />
                            </>
                          ) : (
                            "Uploaded"
                          )}
                        </>
                      )}
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
                      onChange={getThumbnail}
                    />
                    <div className={styles.inputRef}>Choose file</div>
                    <p>{thumbnailDetails.length === 0 ? "Upload Thumbnail Image" : thumbnailDetails.name}</p>
                  </div>
                  {thumbnailDetails.length !== 0 ? (
                    <div className={styles.uploadButtonActive} onClick={() => handleUploadThumb(thumbnailDetails)}>
                      {thumbnailLoading ? (
                        <PulseLoader color="#ffffff" />
                      ) : (
                        <>
                          {thumbnail === "" ? (
                            <>
                              Upload <img src="/img/requirement/upload.svg" alt="" />
                            </>
                          ) : (
                            "Uploaded"
                          )}
                        </>
                      )}
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
            <Link href="/">
              <div className={styles.contactUs_button}>Cancel</div>
            </Link>
            <div className={styles.save_button} onClick={goToUserDash}>
              {isLoading ? <PulseLoader color="#ffffff" /> : "Send Requirement"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadMain;
