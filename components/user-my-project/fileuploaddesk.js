import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import api_url from "../../src/utils/url";
import { PulseLoader } from "react-spinners";

import styles from "./fileuploaddesk.module.css";
import stylesf from "./uploadedfiles.module.css";

const FnFileUploadDesk = ({ projectId, allUploadedFiles }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cancelFunction = () => {
    setFiles([]);
  };

  var projectImages = [];

  const handleSubmit = async () => {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/fileupload/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: description,
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

  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      setFile(event.target.files[0]);
    }
  };

  const uploadProject = () => {
    if (file !== undefined) {
      handleUploadProject(file);
    } else {
      console.log(error);
    }
  };

  console.log(file);

  /* <=========== FIREBASE UPLOAD END ===========> */

  return (
    <>
      <div className={styles.secTwoMain}>
        <>
          <div className={styles.fileUploadSectionArch}>
            <div>Store files</div>
          </div>
          <div className={styles.uploadDescSec}>
            <input
              type="text"
              className={styles.uploadDesc}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className={styles.dragDropSec}>
            <input
              className={styles.custom_file_input}
              type="file"
              onChange={handleFileChange}
              placeholder="No file selected"
              accept="application/pdf"
            />
            <div className={styles.dragDrop}>Drag & drop your file</div>
            <div className={styles.fileOuter}>
              {file ? (
                <div className={styles.file}>
                  <div>
                    <img src="/img/my-project-user/data.svg" />
                    <span>{file.name}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.fileButtonsSec}>
            <div className={styles.cancelBtn} onClick={() => cancelFunction()}>
              cancel
            </div>
            <div className={styles.uploadBtn} onClick={() => uploadProject()}>
              {isLoading ? (
                <div>
                  <PulseLoader color="#642dda" size={10} />
                </div>
              ) : (
                <>
                  <img src="/img/my-project-user/upload.svg" alt="upload.svg" className={styles.upload} />
                  <span>Submit</span>
                </>
              )}
            </div>
          </div>
        </>
        <>
          <div>
            <div className={stylesf.fileOuter}>
              <div className={stylesf.uploadedFiles}>Uploaded file:</div>
              {allUploadedFiles?.map((items, key) => {
                return (
                  <div key={key}>
                    <div className={stylesf.file}>
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
          </div>
        </>
      </div>
    </>
  );
};

export default FnFileUploadDesk;
