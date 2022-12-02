import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StoreContext } from "../../components/StoreContext";
import storage from "../../firebase";
import { Upload } from "antd";
const { Dragger } = Upload;

import styles from "./fileuploaddesk.module.css";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const FnFileUploadDesk = (projectId) => {
  console.log(projectId);
  const [Store] = useContext(StoreContext);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const handler = (e) => {
    setDescription(e.target.value);
  };

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
    console.log(data);
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
          setProjectImages((projectImages) => [...projectImages, url]);
        });
      }
    );
  }

  console.log(projectImages);

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
    alert("uploaded");
  };

  useEffect(() => {
    // console.log(uploadProject);
    console.log(files.length);
    console.log(projectImages.length);
    if (files.length === projectImages.length && files.length !== 0 && projectImages.length !== 0) {
      handleSubmit(id);
    }
  }, [projectImages]);

  const singleDeleteImage = (i) => {
    let temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
  };
  return (
    <>
      <div className={styles.secTwoMain}>
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
              console.log("file +" + files);
              return (
                <div key={key} className={styles.file}>
                  <div>
                    <img src="/img/my-project-user/data.svg" />
                    <span>{file.file.name}</span>
                  </div>
                  <img src="/img/architect-dashboard/delete-h.svg" alt="" onClick={() => singleDeleteImage(index)} />
                  {/* <span className={styles.fileDelete}>Delete</span> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.fileButtonsSec}>
          <div className={styles.cancelBtn}>cancel</div>

          <div className={styles.uploadBtn} onClick={() => uploadProject(projectId.projectId)}>
            <img src="/img/my-project-user/upload.svg" alt="upload.svg" className={styles.upload} />
            <span>Upload</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnFileUploadDesk;
