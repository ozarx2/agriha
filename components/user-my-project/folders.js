/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import FnfilesOpen from "./filesOpen";
import styles from "./folder.module.css";
import FnFolderCard from "./foldercard";

const FnFileFolder = ({ documents }) => {
  const [isFolederOpen, setIsFolderOpen] = useState(false);

  const [filesSingle, setFilesSingle] = useState([]);

  const folderClick = (files) => {
    setFilesSingle(files);
    setIsFolderOpen(true);
  };

  const viewFile = (url) => {
    window.location.href = url;
  };

  console.log(documents);
  return (
    <>
      {!isFolederOpen ? (
        <div className={styles.filefolderSectionMain}>
          <div className={styles.fileBorderBottom}>
            <div className={styles.filefolderHead}>
              <div className={styles.filefolderTitle}>
                <div>
                  <div className={styles.folderSectionHead}>
                    File Folders. <span>{documents.length}</span>
                  </div>
                  <div className={styles.viewAll}>
                    <div>
                      <div>View all</div>
                      <img src="/img/my-project-user/viewalldown.svg" alt="viewalldown.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.sortSection}>
                <div className={styles.createFolder}>
                  <img
                    src="/img/my-project-user/foldertrans.svg"
                    alt="foldertrans.svg"
                    className={styles.foldertrans}
                  />
                  <div>Create folder</div>
                </div>
              </div>
            </div>
            <div className={styles.fileUploadsSectionMain}>
              {documents?.map((files, index) => {
                return (
                  <div key={index} className={styles.fileUploadsSection} onClick={() => folderClick(files.files)}>
                    <FnFolderCard title={files.title} date={files.date} fileLists={files.files} />
                  </div>
                );
              })}

              {/* ================================================ */}

              {/* <div className={styles.fileUploadsSection}>
              <div className={styles.fileUploadDiv}>
                <div className={styles.fileUpload}>
                  <img src="/img/my-project-user/pdf.svg" alt="pdf.svg" />
                  <div className={styles.fileFolderTitle}>test.pdf</div>
                  <div className={styles.fileFolderdate}>21/12/2022</div>
                </div>
                <div>
                  <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                </div>
              </div>
            </div>
            <div className={styles.fileUploadsSection}>
              <div className={styles.fileUploadDiv}>
                <div className={styles.fileUpload}>
                  <img src="/img/my-project-user/jpg.svg" alt="jpg.svg" />
                  <div className={styles.fileFolderTitle}>design.jpeg</div>
                  <div className={styles.fileFolderdate}>21/12/2022</div>
                </div>
                <div>
                  <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                </div>
              </div>
            </div> */}

              {/* ================================================ */}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.filefolderSectionMain}>
          <div className={styles.fileBorderBottom}>
            <div className={styles.filefolderHead}>
              <div className={styles.filefolderTitle}>
                <div>
                  <div className={styles.folderSectionHead}>
                    Files. <span>{filesSingle.length}</span>
                  </div>
                  <div className={styles.viewAll}>
                    <div>
                      <div>View all</div>
                      <img src="/img/my-project-user/viewalldown.svg" alt="viewalldown.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.sortSection}>
                <div className={styles.createFolder}>
                  <img
                    src="/img/my-project-user/foldertrans.svg"
                    alt="foldertrans.svg"
                    className={styles.foldertrans}
                  />
                  <div>Create folder</div>
                </div>
              </div>
            </div>
            <div className={styles.fileUploadsSectionMain}>
              {filesSingle?.map((files, index) => {
                return (
                  <div className={styles.fileUploadsSection} onClick={() => viewFile(files.url)}>
                    <div className={styles.fileUploadDiv}>
                      <div className={styles.fileUpload}>
                        <img src="/img/my-project-user/pdf.svg" alt="pdf.svg" />
                        <div className={styles.fileFolderTitle}>{files.filename}</div>
                      </div>
                      {/* <div>
                        <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                      </div> */}
                    </div>
                  </div>
                );
              })}

              {/* <div className={styles.fileUploadsSection}>
              <div className={styles.fileUploadDiv}>
                <div className={styles.fileUpload}>
                  <img src="/img/my-project-user/Folder.svg" alt="folder.svg" />
                  <div className={styles.fileFolderTitle}>Interior</div>
                  <div className={styles.fileFolderdate}>21/12/2022</div>
                </div>
                <div>
                  <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                </div>
              </div>
            </div> */}

              {/* ================================================ */}

              {/* <div className={styles.fileUploadsSection}>
                <div className={styles.fileUploadDiv}>
                  <div className={styles.fileUpload}>
                    <img src="/img/my-project-user/jpg.svg" alt="jpg.svg" />
                    <div className={styles.fileFolderTitle}>design.jpeg</div>
                    <div className={styles.fileFolderdate}>21/12/2022</div>
                  </div>
                  <div>
                    <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                  </div>
                </div>
              </div> */}

              {/* ================================================ */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnFileFolder;
