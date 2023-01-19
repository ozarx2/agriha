import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import api_url from "../../src/utils/url";
import { PulseLoader } from "react-spinners";

import styles from "./fileuploadmob.module.css";
import stylefl from "./uploadedfiles.module.css";

const FnFileUploadMob = ({ projectId, allUploadedFiles }) => {
  const [descriptionMob, setDescriptionMob] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  var projectImages = [];

  const handleSubmit = async () => {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/fileupload/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: descriptionMob,
        files: projectImages,
        project_id: projectId,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    window.location.reload();
  };

  /* <=========== FIREBASE UPLOAD START ===========> */

  /* Upload project images */
  const [files, setFiles] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

  function handleUploadProject(img) {
    setIsLoading(true);
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
          projectImages.push(url);
          setTimeout(() => {
            handleSubmit();
          }, 1000);
        });
      }
    );
  }

  /* Multiple Image Uploading */
  var fileObj = [];
  var fileArray = [];

  const uploadMultipleFiles = (e) => {
    if (e.target.files.length <= 10) {
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
        setFiles((files) => [...files, { url: URL.createObjectURL(fileObj[0][i]), file: fileObj[0][i] }]);
      }
    } else {
      alert("Cannot add more than 10 pictures");
    }
  };

  const uploadProject = () => {
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      handleUploadProject(temp[i].file);
    }
  };

  /* <=========== FIREBASE UPLOAD END ===========> */

  const result = allUploadedFiles.filter((res) => res.project_id === projectId);

  return (
    <>
      {/* {result.length === 0 ? ( */}
      <>
        <div className={styles.sentFileUploadMainSecMobTitle}>File upload</div>
        <input
          type="text"
          className={styles.sentFileDescMob}
          placeholder="Enter Description"
          onChange={(e) => setDescriptionMob(e.target.value)}
        />

        <div id="FnUserMyProjectMobileUpload" className={styles.dragDropSec}>
          <input
            className={styles.custom_file_input}
            type="file"
            onChange={uploadMultipleFiles}
            placeholder="No file selected"
            accept="application/pdf"
          />
          <div className={styles.dragDrop}>Drag & drop your file</div>
          <div className={styles.fileOuter}>
            {files.map((file, key) => {
              console.log(file);
              return (
                <div key={key} className={styles.file}>
                  <div>
                    <img src="/img/my-project-user/data.svg" />
                    <span>{file.file.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.uploadFileDescMob} onClick={() => uploadProject()}>
          {isLoading ? (
            <div>
              <PulseLoader color="#ffffff" size={10} />
            </div>
          ) : (
            <>
              <img src="/img/my-project-user/mobile/uploadmob.svg" alt="uploadmob.svg" className={styles.upload} />
              <span>UploadFile</span>
            </>
          )}
        </div>
      </>
      {/* ) : ( */}
      <>
        <div className={stylefl.fileOuter}>
          <div className={stylefl.uploadedFiles}>Uploaded file:</div>
          {result?.map((items, key) => {
            return (
              <div key={key}>
                <div className={stylefl.file}>
                  <div>
                    <img src="/img/my-project-user/data.svg" />
                    <span>{items?.description}</span>
                  </div>
                  <a target="_blank" href={`${items.files[0]}`}>
                    view
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default FnFileUploadMob;
