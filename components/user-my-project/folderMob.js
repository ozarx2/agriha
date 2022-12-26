import React, { useState } from "react";
import FnFolderCardMob from "./folderCardMob";
import styles from "./folderMob.module.css";

const FnFolderMob = ({ documents, projectId }) => {
  const [isFolederOpen, setIsFolderOpen] = useState(false);
  const [filesSingle, setFilesSingle] = useState([]);

  const [viewFileMore, setViewFileMore] = useState(false);
  const [fileViewMore, setfileViewMore] = useState("");

  const toggleFileBtnMob = (projectId) => {
    setViewFileMore((prevState) => !prevState);
    setfileViewMore(projectId);
  };
  const folderClick = (files) => {
    setFilesSingle(files);
    setIsFolderOpen(true);
  };

  const viewFile = (url) => {
    window.location.href = url;
  };

  return (
    <>
      {!isFolederOpen ? (
        <>
          <div className={styles.fileUploadSecMainMobHead}>
            <div className={styles.fileUploadSecMainMobTitle} onClick={() => toggleFileBtnMob(projectId)}>
              File manager <span className={styles.fileCount}> ({documents?.length})</span>
              <span onClick={() => toggleFileBtnMob(projectId)}>
                {viewFileMore && fileViewMore === projectId ? (
                  <img src="/img/my-project-user/mobile/upmob.svg" alt="up.svg" />
                ) : (
                  <img src="/img/my-project-user/mobile/downmob.svg" alt="up.svg" />
                )}
              </span>
            </div>
            {/* <div className={styles.fileSortSecMainMob}>
          <img src="img/my-project-user/mobile/sortmob.svg" alt="sortmob.svg" />
          Sort list
        </div> */}
            <div className={styles.createFolderSecMainMob}>
              <img src="img/my-project-user/mobile/filetransmob.svg" alt="filetransmob.svg" />
              Create folder
            </div>
          </div>
          {documents?.map((files, index) => {
            return (
              <div key={index} onClick={() => folderClick(files.files)}>
                <FnFolderCardMob title={files.title} date={files.date} fileLists={files.files} />
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className={styles.fileUploadSecMainMobHead}>
            <div className={styles.fileUploadSecMainMobTitle} onClick={() => toggleFileBtnMob(projectId)}>
              File manager <span className={styles.fileCount}> ({documents?.length})</span>
              <span onClick={() => toggleFileBtnMob(projectId)}>
                {viewFileMore && fileViewMore === projectId ? (
                  <img src="/img/my-project-user/mobile/upmob.svg" alt="up.svg" />
                ) : (
                  <img src="/img/my-project-user/mobile/downmob.svg" alt="up.svg" />
                )}
              </span>
            </div>
            {/* <div className={styles.fileSortSecMainMob}>
            <img src="img/my-project-user/mobile/sortmob.svg" alt="sortmob.svg" />
            Sort list
          </div> */}
            <div className={styles.createFolderSecMainMob}>
              <img src="img/my-project-user/mobile/filetransmob.svg" alt="filetransmob.svg" />
              Create folder
            </div>
          </div>
          <div>
            {filesSingle?.map((files, index) => {
              return (
                <div className={styles.filesMobSecMain} onClick={() => viewFile(files.url)}>
                  <div className={styles.filesMobSec}>
                    <div className={styles.fileImgNameSec}>
                      <img src="/img/my-project-user/pdf.svg" alt="pdf.svg" />
                      <div className={styles.filesMobTitle}>
                        <div>{files.filename}</div>
                        {/* <small>{moment(date).format("l")}</small> */}
                      </div>
                    </div>
                    {/* <div className={styles.fileMoreMobSec}>
                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
              </div> */}
                  </div>
                  {/* <div className={styles.filesMobSec}>
              <div className={styles.fileImgNameSec}>
                <img src="img/my-project-user/mobile/pdfmob.svg" alt="pdfmob.svg" />
                <div className={styles.filesMobTitle}>
                  <div>New lan.pdf</div>
                  <small>21/12/2022</small>
                </div>
              </div>
              <div className={styles.fileMoreMobSec}>
                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
              </div>
            </div>
            <div className={styles.filesMobSec}>
              <div className={styles.fileImgNameSec}>
                <img src="img/my-project-user/mobile/imgmob.svg" alt="imgmob.svg" />
                <div className={styles.filesMobTitle}>
                  <div>Oi design.jpg</div>
                  <small>21/12/2022</small>
                </div>
              </div>
              <div className={styles.fileMoreMobSec}>
                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
              </div>
            </div> */}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default FnFolderMob;
