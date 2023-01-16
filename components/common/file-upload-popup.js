/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import styles from "./file-upload-popup.module.css";

export default function FileUploadPopup() {
  const [Store] = useContext(StoreContext);

  const setFileUploadPopup = Store.setFileUploadPopup;
  const fileUploadId = Store.fileUploadId;

  const [titleFileUpload, setTitleFileUpload] = useState("");
  const [filenameUpload, setFilenameUpload] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  /* STORE TITLE */
  const titleChange = (e) => {
    setTitleFileUpload(e.target.value);
  };

  /* STORE FILENAME */
  const fileNameChange = (e) => {
    setFilenameUpload(e.target.value);
  };

  /* UPLOAD FILES API*/
  async function uploadFiles() {
    if (titleFileUpload !== "" && uploadedDocuments !== [] && fileUploadId !== "") {
      const res = await fetch(`${endpoint}/fileupload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleFileUpload,
          files: uploadedDocuments,
          project_id: fileUploadId,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.status === 200) {
        setFileUploadPopup(false);
      }
    }
  }

  /* STORE MULTIPLE FILES */
  const [files, setFiles] = useState([]);

  const addFiles = (file, filename) => {
    setFiles((files) => [...files, file]);
    setUploadedDocuments((uploadedDocuments) => [...uploadedDocuments, { filename: filename, url: file }]);
  };

  /* UPLOAD DOCUMENTS */
  const [fileBeforeUpload, setFileBeforeUpload] = useState([]);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");

  function handleUpload(pdf) {
    setFileBeforeUpload(pdf);
    console.log("document uploading");
    if (!pdf) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/projectfiles/${pdf.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdf);

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
          console.log("url", url);
          addFiles(url, filenameUpload);
          setUrl(url);
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

  console.log(files);
  console.log(fileBeforeUpload);

  return (
    <>
      <div className={styles.FileUploadPopupOuter}>
        <div className={styles.FileUploadPopupInner}>
          <div className={styles.heading}>
            <img src="/img/architect-dashboard/file-upload.svg" alt="file-upload" />
            <span>File upload</span>
          </div>
          <div className={styles.content}>
            <div className={styles.create_folder}>
              <div className={styles.one}>
                <input type="type" placeholder="Enter the title" onChange={titleChange} />
              </div>
              <div className={styles.one}>
                <input type="type" placeholder="Enter the filename" onChange={fileNameChange} />
              </div>
              {files.length == 0 ? (
                <div className={styles.two}>
                  <input type="file" accept="application/pdf" onChange={handleChange} />
                  <div className={styles.s_add_feild}>
                    <img src="/img/architect-dashboard/plus.svg" alt="file-upload" />
                    <span>Add file</span>
                  </div>
                </div>
              ) : (
                <div className={styles.three}>
                  <div className={styles.s_uploded_pdf}>
                    <img src="/img/architect-dashboard/pdf.svg" alt="uploaded pdf" />
                    <div>
                      <div>Selected Filename :{filenameUpload ? filenameUpload : " Please type filename above"}</div>

                      <div>Size : {(fileBeforeUpload.size / 1024).toFixed(2)} KB</div>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.three}>
                <div onClick={() => setFileUploadPopup(false)} className={styles.clear}>
                  Cancel
                </div>
                <div className={styles.upload} onClick={uploadFiles}>
                  <img src="/img/architect-dashboard/ofu.svg" alt="file-upload" />
                  <span>Upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={() => setFileUploadPopup(false)} className={styles.FileUploadPopupClose}></div>
      </div>
    </>
  );
}
