import React, { useEffect, useState, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StoreContext } from "../../components/StoreContext";
import storage from "../../firebase";

import styles from "./fileuploaddesk.module.css";

import stylesf from "./uploadedfiles.module.css";

const FnFileUploadDesk = ({ projectId }) => {
  // console.log(projectId);
  const [Store] = useContext(StoreContext);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const handler = (e) => {
    setDescription(e.target.value);
  };

  const [fileUploads, setFileUpload] = useState([]);

  async function getUploadFile() {
    const token = localStorage.getItem("userToken");
    const response = await fetch("https://agriha-server-dot-agriha-services.uc.r.appspot.com/fileupload/userfiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      setFileUpload(data.userFile);
    }
  }

  const handleSubmit = async (id) => {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`https://agriha-server-dot-agriha-services.uc.r.appspot.com/fileupload/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: description,
        files: projectImages,
        project_id: id,
      }),
    });
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
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentProject(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
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
        setFiles((files) => [...files, { url: URL.createObjectURL(fileObj[0][i]), file: fileObj[0][i] }]);
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
    if (files.length === projectImages.length && files.length !== 0 && projectImages.length !== 0) {
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
      <div className={styles.secTwoMain}>
        {console.log(fileUploads)}
        {result.length === 0 ? (
          <>
            <div className={styles.fileUploadSectionArch}>
              <div>File upload to Architect</div>
            </div>
            <div className={styles.uploadDescSec}>
              <input type="text" className={styles.uploadDesc} onChange={handler} placeholder="Enter description" />
            </div>
            <div className={styles.dragDropSec}>
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
            <div className={styles.fileButtonsSec}>
              <div className={styles.cancelBtn} onClick={() => cancelFunction()}>
                cancel
              </div>
              <div className={styles.uploadBtn} onClick={() => uploadProject(projectId.projectId)}>
                <img src="/img/my-project-user/upload.svg" alt="upload.svg" className={styles.upload} />
                <span>Upload</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className={stylesf.fileOuter}>
                {result?.map((items, key) => {
                  return (
                    <>
                      <div className={stylesf.uploadedFiles}>Uploaded file:</div>
                      <div className={stylesf.file}>
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FnFileUploadDesk;
