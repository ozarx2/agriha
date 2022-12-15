/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import Accordion from "./accordion";
import styles from "./folder-popup.module.css";
import endpoint from "../../src/utils/endpoint";
import moment from "moment/moment";
import { PulseLoader } from "react-spinners";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import Link from "next/link";

export default function FolderPopup({ folderPopup, setFolderPopup }) {
  const [lock, setLock] = useState(false);
  const [addFolder, setAddFolder] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [Store] = useContext(StoreContext);

  const projectId = Store.projectId;

  const [documents, setDocuments] = useState([]);

  async function getUploadedFiles() {
    const response = await fetch(`${endpoint}/fileupload/uploaded_file/${projectId._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    // console.log(data.data);
    setDocuments(data.data);
  }

  useEffect(() => {
    if (projectId) {
      getUploadedFiles();
    }
  }, [projectId]);

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

  /* STORE MULTIPLE FILES */
  const [files, setFiles] = useState([]);

  const addFiles = (file, filename) => {
    setFiles((files) => [...files, file]);
    setUploadedDocuments((uploadedDocuments) => [...uploadedDocuments, { filename: filename, url: file }]);
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
          addFiles(url, filenameUpload);
          setUrl(url);
          setUploading(false);
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

  /* UPLOAD FILES*/
  async function uploadFiles() {
    console.log(titleFileUpload);
    console.log(uploadedDocuments);
    console.log(projectId);
    if (titleFileUpload !== "" && uploadedDocuments !== [] && projectId !== "") {
      const res = await fetch(`${endpoint}/fileupload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleFileUpload,
          files: uploadedDocuments,
          project_id: projectId._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        getUploadedFiles();
      }
    } else {
      alert("Please enter all details");
    }
  }

  /* DELETE FILE */
  async function deleteFile(id, folderId) {
    var result = confirm("are you sure you want to delete ?");

    if (result) {
      const res = await fetch(`${endpoint}/fileupload/file/${folderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filesId: id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        getUploadedFiles();
      }
    }
  }

  return (
    <>
      <div className={styles.FolderPopupOuter}>
        <div className={styles.FolderPopupInner}>
          <div className={styles.heading}>
            <div className={styles.left}>
              <div className={styles.main}>{projectId.project_name}</div>
              <div className={styles.sub}>{documents?.length} Document folders</div>
            </div>
            <div className={styles.right}>
              <div onClick={() => setAddFolder(true)} className={styles.add_folder}>
                <img src="/img/architect-dashboard/plus-yellow.svg" alt="sort" />
                <span>Add Folder</span>
              </div>
              <div onClick={() => setFolderPopup(false)} className={styles.back}>
                Back
              </div>
            </div>
          </div>
          <div className={styles.content}>
            {addFolder ? (
              <>
                <div className={styles.create_folder}>
                  <div className={styles.one}>
                    <input type="type" placeholder="Enter the title" onChange={titleChange} />
                  </div>
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
                    <div onClick={() => setAddFolder(false)} className={styles.clear}>
                      Clear
                    </div>
                    <div onClick={uploadFiles} className={styles.upload}>
                      Upload
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {documents
              ?.slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <Accordion
                    folder_name={item?.title}
                    paymentStatus={item?.payment_status}
                    date={moment(item?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    folderId={item?._id}
                    key={index}
                  >
                    <div className={styles.Pfile_outer}>
                      {item?.files?.map((file, i) => {
                        return (
                          <>
                            {file.isDelete ? (
                              <div className={`${styles.Pfile} ${styles.deleted}`} key={i}>
                                <div className={styles.left}>
                                  <div className={styles.img}>
                                    <img src="/img/architect-dashboard/file-d.svg" alt="alt" />
                                  </div>
                                  <div className={styles.name}>
                                    <div className={styles.first}>
                                      <div>{file.filename}</div>
                                      <div>
                                        {lock ? (
                                          <img src="/img/architect-dashboard/slock-d.svg" alt="alt" />
                                        ) : (
                                          <img src="/img/architect-dashboard/sunlock-d.svg" alt="alt" />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.right}>
                                  <div className={styles.delete}>
                                    <img src="/img/architect-dashboard/delete-d.svg" alt="alt" />
                                  </div>
                                  <div className={styles.download}>
                                    <img src="/img/architect-dashboard/download-d.svg" alt="alt" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.Pfile}>
                                <div className={styles.left}>
                                  <div className={styles.img}>
                                    <img src="/img/architect-dashboard/file.svg" alt="alt" />
                                  </div>
                                  <div className={styles.name}>
                                    <div className={styles.first}>
                                      <div>{file.filename}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.right}>
                                  <div className={styles.delete}>
                                    <img
                                      onClick={() => deleteFile(file.id, item._id)}
                                      className={styles.delete_h}
                                      src="/img/architect-dashboard/fdelete-h.svg"
                                      alt="alt"
                                    />
                                    <img
                                      className={styles.delete_nh}
                                      src="/img/architect-dashboard/fdelete-nh.svg"
                                      alt="alt"
                                    />
                                  </div>
                                  <div className={styles.download}>
                                    <Link href={file.url} passHref>
                                      <a download target="_blank">
                                        <img
                                          className={styles.download_h}
                                          src="/img/architect-dashboard/fdown-h.svg"
                                          alt="alt"
                                        />
                                      </a>
                                    </Link>
                                    <img
                                      className={styles.download_nh}
                                      src="/img/architect-dashboard/fdown-nh.svg"
                                      alt="alt"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </Accordion>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
