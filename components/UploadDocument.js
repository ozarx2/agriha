/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import style from "../styles/UploadDocument.module.css";
import styles from "../styles/ProjectView.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import api_url from "../src/utils/url";
import endpoint from "../src/utils/endpoint";

const UploadDocument = (id) => {
  const [projectId, setProjectId] = useState("");
  const [titleFileUpload, setTitleFileUpload] = useState("");
  const [filenameUpload, setFilenameUpload] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const [files, setFiles] = useState([]);

  const [projectDetails, setProjectDetails] = useState([]);
  const [details, setdetails] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    if (id.id !== undefined) {
      setProjectId(id.id);
    }
  }, [id.id]);

  /* GET PROJECT DETAILS */
  async function getProjectDetails() {
    const response = await fetch(`${api_url}/projects/single/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      console.log(data.data[0]);
      setProjectDetails(data.data[0]);
      setdetails(data.details[0]);
    }
  }

  /* GET UPLOADED FILES */
  async function getUploadedFiles() {
    const response = await fetch(
      `${endpoint}/fileupload/uploaded_file/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    setDocuments(data.data);
  }

  useEffect(() => {
    if (projectId !== "") {
      getProjectDetails();
      getUploadedFiles();
    }
  }, [projectId]);

  /* STORE TITLE */
  const titleChange = (e) => {
    setTitleFileUpload(e.target.value);
  };

  /* STORE FILENAME */
  const fileNameChange = (e) => {
    setFilenameUpload(e.target.value);
  };

  /* STORE MULTIPLE FILES */
  const addFiles = (file, filename) => {
    setFiles((files) => [...files, file]);
    setUploadedDocuments((uploadedDocuments) => [
      ...uploadedDocuments,
      { filename: filename, url: file },
    ]);
    setLoadingAction(false);
  };

  /* UPLOAD DOCUMENTS */
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");

  function handleUpload(pdf) {
    setLoadingAction(true);
    console.log("document uploading");
    if (!pdf) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/projectfiles/${pdf.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdf);

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
          console.log("url", url);
          addFiles(url, filenameUpload);
          setUrl(url);
          setFilenameUpload("");
        });
      }
    );
  }

  const handleChange = (event) => {
    console.log("onchange");
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      console.log(event.target.files[0]);
      handleUpload(event.target.files[0]);
    }
  };

  /* UPLOAD FILES API*/
  async function uploadFiles() {
    if (titleFileUpload !== "" && uploadedDocuments !== []) {
      const res = await fetch(`${endpoint}/fileupload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleFileUpload,
          files: uploadedDocuments,
          project_id: projectId,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        document.getElementById("bodyAddFiles").style.display = "none";
        document.getElementById("plusButton").style.display = "flex";
        window.location.reload();
      }
    } else {
      alert("Please enter all details");
    }
  }

  const plusClick = () => {
    document.getElementById("bodyAddFiles").style.display = "flex";
    document.getElementById("plusButton").style.display = "none";
  };

  /* DELETE FILE */
  async function deleteFiletemp(id) {
    var result = confirm("are you sure you want to delete ?");
    if (result) {
      const res = await fetch(`${endpoint}/fileupload/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        window.location.reload();
      }
    }
  }

  const handleUnlock = async (id) => {
    var result = confirm("are you sure you want to unlock ?");
    if (result) {
      const res = await fetch(`${endpoint}/fileupload/payment_status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <div className={style.projectView}>
      <h2>Project Details</h2>
      <div className={styles.headerProjectView}>
        <div>
          <h3>{projectDetails.project_name}</h3>
          <h4 className={style.headerProjectView__type}>
            {projectDetails.project_type}
          </h4>
        </div>
        <div className={styles.headerProjectView__date}>
          <p>Started Date</p>
          <h5>{projectDetails.starting_date}</h5>
        </div>
      </div>
      <div className={styles.projectViewContainer}>
        <div>
          <h4>Total Area</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.total_area}
              readOnly
              type="number"
              name="total_area"
            />
          </div>
        </div>
        <div>
          <h4>Total Budget</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.total_budget}
              readOnly
              type="number"
              name="total_budge"
            />
          </div>
        </div>
        <div
          style={
            details?.no_of_floors ? { display: "block" } : { display: "none" }
          }
        >
          <h4>Number of Floors</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.no_of_floors}
              readOnly
              type="number"
              name="no_of_floors"
            />
          </div>
        </div>
        <div
          style={
            details?.no_of_bedrooms ? { display: "block" } : { display: "none" }
          }
        >
          <h4>Number of Bedrooms</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.no_of_bedrooms}
              readOnly
              type="number"
              name="no_of_bedrooms"
            />
          </div>
        </div>

        <div
          style={
            details?.attached_bathrooms
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <h4>Number of Attached Bathrooms</h4>
          <div className={styles.content__inputs}>
            <input
              value={details?.attached_bathrooms}
              readOnly
              type="number"
              name="attached_bathrooms"
            />
          </div>
        </div>
      </div>

      <div className={styles.architectDetails}>
        <div className={style.titleUploadDocument__container}>
          <h3 className={style.titleUploadDocument}>Upload Documents</h3>
          <div onClick={plusClick} className={style.plusButton} id="plusButton">
            <Image
              className={styles.header__logo}
              src="/plusIcon.svg"
              alt="Arclif Logo"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className={style.bodyAddFiles} id="bodyAddFiles">
          <div className={style.bodyAddFiles__top}>
            <div className={style.inputContainer}>
              <div className={style.inputContainer__filelds}>
                <p>Title</p>
                <input
                  className={style.input__title}
                  onChange={titleChange}
                  type="text"
                />
              </div>
              <div>
                <div className={style.inputContainer__filelds}>
                  <p>File Name</p>
                  <input
                    className={style.input__title}
                    onChange={fileNameChange}
                    type="text"
                    value={filenameUpload}
                  />
                </div>
                <div className={style.inputContainer__filelds}>
                  <p>Choose Documents</p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {uploadedDocuments[0]?.filename !== "" ? (
              <div className={style.fileView__container}>
                {uploadedDocuments.map((items, index) => {
                  return (
                    <div key={index} className={style.fileView}>
                      <a target="_blank" rel="noreferrer" href={items.url}>
                        <Image
                          className={styles.header__logo}
                          src="/pdfFile.svg"
                          alt="Arclif Logo"
                          width={50}
                          height={50}
                        />
                      </a>
                      <p>{items.filename}</p>
                    </div>
                  );
                })}
                {loadingAction ? <p>Loading ...</p> : ""}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.upload_files_button} onClick={uploadFiles}>
            UPLOAD FILES
          </div>
        </div>
      </div>

      {projectDetails.creator?.name ? (
        <div className={styles.architectDetails}>
          <h3>User Details</h3>
          <div className={styles.architectDetails__bottom}>
            <div className={styles.architectDetails__card}>
              <div className={styles.architectDetails__top}>
                <div className={styles.architectDetails__top__left}>
                  {projectDetails.creator?.profile_pic ? (
                    <div
                      style={{
                        backgroundImage: `url(${projectDetails.creator?.profile_pic})`,
                      }}
                      className={styles.architectDetails__card__avatar}
                    ></div>
                  ) : (
                    <div className={styles.architectDetails__card__avatar}>
                      {projectDetails?.creator?.name?.charAt(0)}
                    </div>
                  )}
                  <div className={styles.architectDetails__card__name}>
                    <h3>{projectDetails.creator?.name}</h3>
                    <h4>{projectDetails.creator?.location}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        style={
          documents?.length <= 0 ? { display: "none" } : { display: "block" }
        }
        className={styles.architectDetails}
      >
        <h3>Uploaded Documents</h3>
        <div className={style.fileViewDiv}>
          {documents?.map((items, index) => {
            return (
              <div key={index} className={style.fileViewContainer}>
                <div className={style.fileViewContainer__title}>
                  <h5>{items.title}</h5>
                  {items.payment_status === false ? (
                    <div
                      onClick={() => handleUnlock(items._id)}
                      className={style.unlockButton}
                    >
                      UNLOCK
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={style.fileCardContainer}>
                  {items.files.map((file, index) => {
                    return (
                      <div
                        key={index}
                        className={style.fileView}
                        style={
                          file.isDelete === true
                            ? { backgroundColor: "#fabc5f" }
                            : {}
                        }
                      >
                        {file.isDelete === false ? (
                          <div className={style.deleteContainer}>
                            <div onClick={() => deleteFiletemp(file.id)}>
                              <Image
                                className={styles.header__logo}
                                src="/trashIcon.svg"
                                alt="Arclif Logo"
                                width={15}
                                height={15}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {file.isDelete === false ? (
                          <>
                            {items.payment_status === true ? (
                              <a
                                className={style.imageContainerClick}
                                target="_blank"
                                rel="noreferrer"
                                href={file.url}
                                style={
                                  file.isDelete === true
                                    ? { marginTop: "10px" }
                                    : {}
                                }
                              >
                                <Image
                                  className={styles.header__logo}
                                  src="/pdfFile.svg"
                                  alt="Arclif Logo"
                                  width={50}
                                  height={50}
                                />
                              </a>
                            ) : (
                              <div
                                className={style.imageContainerClick}
                                style={
                                  file.isDelete === true
                                    ? { marginTop: "10px" }
                                    : {}
                                }
                              >
                                <Image
                                  className={styles.header__logo}
                                  src="/lock.png"
                                  alt="Arclif Logo"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <div
                            className={style.imageContainerClick}
                            style={
                              file.isDelete === true
                                ? { marginTop: "10px" }
                                : {}
                            }
                          >
                            <Image
                              className={styles.header__logo}
                              src="/pdfFile.svg"
                              alt="Arclif Logo"
                              width={50}
                              height={50}
                            />
                          </div>
                        )}
                        {file.isDelete === true ? (
                          <>
                            <p>{file.filename}</p>
                            <h5>File Deleted</h5>
                          </>
                        ) : (
                          <p>{file.filename}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
