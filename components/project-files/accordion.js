/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import endpoint from "../../src/utils/endpoint";
import { PulseLoader } from "react-spinners";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import styles from "./folder-popup.module.css";

export default function Accordion({ folder_name, children, paymentStatus, date, folderId }) {
  const [isShowing, setIsShowing] = useState(false);
  const [addFile, setAddFile] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lock, setLock] = useState(!paymentStatus);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const handleUnlock = async (id) => {
    console.log(id);
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

  /* STORE FILENAME */
  const [filenameUpload, setFilenameUpload] = useState("");

  const fileNameChange = (e) => {
    setFilenameUpload(e.target.value);
  };

  /* UPLOAD DOCUMENTS */
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");

  function handleUpload(pdf) {
    console.log("document uploading");
    setUploading(true);
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
          setUrl(url);
          setUploading(false);
        });
      }
    );
  }

  const handleChange = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUpload(event.target.files[0]);
    }
  };

  /* UPLOAD FILE*/
  async function uploadFile() {
    if (filenameUpload !== "" && url !== "" && folderId !== "") {
      const res = await fetch(`${endpoint}/fileupload/addfiles/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: filenameUpload,
          url: url,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        window.location.reload();
      }
    } else {
      alert("Please enter all details");
    }
  }

  return (
    <>
      <div className={styles.Pfolderouter}>
        <div onClick={toggle} className={styles.Pfolder}>
          <div className={styles.left}>
            <div className={styles.folderimg}>
              <img src="/img/architect-dashboard/folder-files.svg" alt="folder" />
            </div>
            <div className={styles.folderDetailsConatiner}>
              <div className={styles.title__folderDetailsConatiner}>
                <div className={styles.foldername}>{folder_name}</div>
                <div className={styles.foldername__lock}>
                  {lock ? (
                    <img src="/img/architect-dashboard/lock.svg" alt="alt" />
                  ) : (
                    <img src="/img/architect-dashboard/unlock.svg" alt="alt" />
                  )}
                </div>
              </div>
              <div className={styles.second__title__folder}>{date}</div>
            </div>
          </div>
          <div className={styles.right}>
            {isShowing ? (
              <img src="/img/architect-dashboard/up.svg" alt="folder" />
            ) : (
              <img src="/img/architect-dashboard/down.svg" alt="folder" />
            )}
          </div>
        </div>
        <div onClick={() => setAddFile(true)} className={styles.add_folder}>
          <img src="/img/architect-dashboard/plus-yellow.svg" alt="sort" />
          <span>Add File</span>
        </div>
        <div className={styles.lock__title}>
          {lock ? (
            <>
              <img
                className={styles.lock_h}
                src="/img/architect-dashboard/lock-h.svg"
                alt="alt"
                onClick={() => handleUnlock(folderId)}
              />
              <img className={styles.lock_nh} src="/img/architect-dashboard/lock-nh.svg" alt="alt" />
            </>
          ) : (
            <>
              <img className={styles.lock_h} src="/img/architect-dashboard/olock-nh.svg" alt="alt" />
              <img className={styles.lock_nh} src="/img/architect-dashboard/olock-nh.svg" alt="alt" />
            </>
          )}
        </div>
      </div>
      {addFile ? (
        <div className={styles.add_new_file}>
          <div className={styles.create_folder}>
            <div className={styles.one}>
              <input type="type" placeholder="Enter the filename" onChange={fileNameChange} />
            </div>
            <div className={styles.two}>
              <input type="file" accept="application/pdf" onChange={handleChange} />
            </div>
            {uploading ? (
              <div className={styles.imageAddingLoading} id="loadingImageUpload">
                uploading
                <PulseLoader color="#000000" size={4} />
              </div>
            ) : (
              ""
            )}
            <div className={styles.three}>
              <div onClick={() => setAddFile(false)} className={styles.clear}>
                Clear
              </div>
              <div className={styles.upload} onClick={uploadFile}>
                Upload
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div style={{ display: isShowing ? "block" : "none" }}>{children}</div>
    </>
  );
}
