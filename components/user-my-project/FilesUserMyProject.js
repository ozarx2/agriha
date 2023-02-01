import { useState } from "react";

import styles from "./UserMyProjectsSingle.module.css";

const FilesUserMyProject = ({ files }) => {
  const [filesNav, setFilesNav] = useState("folders");
  const [fileOpen, setFileOpen] = useState(false);
  const [filesData, setFilesData] = useState([]);

  console.log(files);

  const filesOpen = (data) => {
    setFilesData(data);
    setFileOpen(true);
  };

  const fileView = (file) => {
    window.location.href = file;
  };

  return (
    <>
      <div className={styles.filesContainer_body_top}>
        <div className={styles.filesContainer_body_top_left}>
          {filesNav === "folders" ? (
            <p className={styles.activeFilesNav}>Files from Architect</p>
          ) : (
            <p onClick={() => setFilesNav("folders")}>Files from Architect</p>
          )}
          {/* {filesNav === "saved" ? (
            <p className={styles.activeFilesNav}>Saved Files</p>
          ) : (
            <p onClick={() => setFilesNav("saved")}>Saved Files</p>
          )} */}
        </div>
        {/* <div className={styles.uploadButton_files}>+ Upload files</div> */}
      </div>

      <div className={styles.filesContainer_body_bottom}>
        <div className={styles.folderConatiner_files}>
          {files.map((item, index) => {
            return (
              <>
                {item.payment_status ? (
                  <div className={styles.folderCard} key={index} onClick={() => filesOpen(item.files)}>
                    <img src="/img/user-my-project/folderIcon.svg" />
                    <div>
                      <p>Folder</p>
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                ) : (
                  <div className={styles.folderCard} key={index}>
                    <img src="/img/user-my-project/folderIconLock.svg" />
                    <div>
                      <p>Locked</p>
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {fileOpen ? (
          <>
            <h3>Files from folder</h3>
            <div className={styles.folderConatiner_files}>
              {filesData.map((item, index) => {
                return (
                  <>
                    {item.isDelete ? (
                      <div className={styles.folderCard} key={index}>
                        <img src="/img/user-my-project/pdfLock.svg" />
                        <div>
                          <p>Locked</p>
                          <h5>{item.filename}</h5>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.folderCard} key={index} onClick={() => fileView(item.url)}>
                        <img src="/img/user-my-project/pdf.svg" />
                        <div>
                          <p>File</p>
                          <h5>{item.filename}</h5>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FilesUserMyProject;
