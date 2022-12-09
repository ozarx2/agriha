import React, { useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StoreContext } from "../../components/StoreContext";
import storage from "../../firebase";
import { Upload } from "antd";
const { Dragger } = Upload;

import styles from "./fileuploadmob.module.css";

import stylefl from "./uploadedfiles.module.css";

import { useContext } from "react";
import { useState } from "react";

const FnFileUploadMob = ({ projectId }) => {
  // console.log(projectId);
  const [Store] = useContext(StoreContext);
  const [descriptionMob, setDescriptionMob] = useState("");
  const [id, setId] = useState("");

  const handlerMob = (e) => {
    setDescriptionMob(e.target.value);
  };

  const [fileUploads, setFileUpload] = useState([]);

  async function getUploadFile() {
    const token = localStorage.getItem("userToken");
    const response = await fetch(
      "https://agriha-server-dot-agriha-services.uc.r.appspot.com/fileupload/userfiles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setFileUpload(data.userFile);
    }
  }

  const handleSubmit = async (id) => {
    const token = localStorage.getItem("userToken");
    const res = await fetch(
      `https://agriha-server-dot-agriha-services.uc.r.appspot.com/fileupload/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: descriptionMob,
          files: projectImages,
          project_id: id,
        }),
      }
    );
    const data = await res.json();
  };

  /* Upload project images */
  const [files, setFiles] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

  function handleUploadProject(img) {
    if (!img) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/projects/${img.name}`);
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
          setProjectImages((projectImages) => [...projectImages, url]);
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
        setFiles((files) => [
          ...files,
          { url: URL.createObjectURL(fileObj[0][i]), file: fileObj[0][i] },
        ]);
      }
    } else {
      alert("Cannot add more than 30 pictures");
    }
  };

  const uploadProject = (id) => {
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      handleUploadProject(temp[i].file);
    }
    setId(id);
  };

  useEffect(() => {
    if (
      files.length === projectImages.length &&
      files.length !== 0 &&
      projectImages.length !== 0
    ) {
      handleSubmit(id);
    }
  }, [projectImages]);

  useEffect(() => {
    getUploadFile();
  }, []);

  const result = fileUploads?.filter((item) => item.project_id === projectId);
  console.log(result);

  return (
    <>
      {result.length === 0 ? (
        <>
          <div className={styles.sentFileUploadMainSecMobTitle}>
            Upload files
          </div>
          <input
            className={styles.sentFileDescMob}
            placeholder="Enter Description"
            value={descriptionMob}
            onChange={handlerMob}
          />

          <div id="FnUserMyProjectMobileUpload" className={styles.dragDropSec}>
            <input
              className={styles.custom_file_input}
              type="file"
              multiple
              onChange={uploadMultipleFiles}
              placeholder="No file selected"
              accept="application/pdf"
            />
            <div className={styles.dragDrop}>
              Select file or <a href="">browse</a>
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
                    {/* <span className={styles.fileDelete}>Delete</span> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={styles.uploadFileDescMob}
            onClick={() => uploadProject(projectId.projectId)}
          >
            <img
              src="/img/my-project-user/mobile/uploadmob.svg"
              alt="uploadmob.svg"
            />
            <span>UploadFile</span>
          </div>
        </>
      ) : (
        <>
          <div className={stylefl.fileOuter}>
            {result?.map((items, key) => {
              return (
                <>
                  <div className={stylefl.uploadedFiles}>Uploaded file:</div>
                  <div className={stylefl.file}>
                    <div>
                      <img src="/img/my-project-user/data.svg" />
                      <span>{items?.description}</span>
                    </div>
                    <a target="_blank" href={`${items}`}>
                      view
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default FnFileUploadMob;
