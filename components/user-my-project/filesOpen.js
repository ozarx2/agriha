import React from "react";
import styles from "./folder.module.css";

const FnfilesOpen = ({ documents }) => {
  return (
    <div className={styles.fileBorderBottom}>
      <div className={styles.filefolderHead}>
        <div className={styles.filefolderTitle}>
          <div>
            <div className={styles.folderSectionHead}>
              File Folder . <span>{documents.length}</span>
            </div>
            <div className={styles.viewAll}>
              <div>
                <div>View all</div>
                <img src="/img/my-project-user/viewalldown.svg" alt="viewalldown.svg" />
              </div>
            </div>
          </div>
          {/* <div className={styles.filefolderSearch}>
                <img src="/img/my-project-user/search.svg" alt="search.svg" />
                <div className={styles.searchbardiv}>
                  <input type="search" placeholder="Search folder here..." className={styles.searchbar} />
                </div>
              </div> */}
        </div>
        <div className={styles.sortSection}>
          {/* <div className={styles.sortList}>
                <img src="/img/my-project-user/sort.svg" alt="sort.svg" className={styles.sortIcon} />
                <div>Sort list</div>
              </div> */}
          <div className={styles.createFolder}>
            <img src="/img/my-project-user/foldertrans.svg" alt="foldertrans.svg" className={styles.foldertrans} />
            <div>Create folder</div>
          </div>
        </div>
      </div>
      <div className={styles.fileUploadsSectionMain}>
        {documents?.map((files, index) => {
          return (
            <div className={styles.fileUploadsSection} key={index}>
              <div className={styles.fileUploadDiv}>
                <div className={styles.fileUpload}>
                  <img src="/img/my-project-user/Folder.svg" alt="folder.svg" />
                  <div className={styles.fileFolderTitle}>{files.title}</div>
                  <div className={styles.fileFolderdate}>{moment(files.createdAt).format("l")}</div>
                </div>
                {/* <div>
                      <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
                    </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FnfilesOpen;
