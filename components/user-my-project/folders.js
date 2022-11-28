/* eslint-disable @next/next/no-img-element */
import styles from "./folder.module.css";

const FnFileFolder = () => {
  return (
    <>
      <div className={styles.filefolderSectionMain}>
        <div className={styles.fileBorderBottom}>
          <div className={styles.filefolderHead}>
            <div className={styles.filefolderTitle}>
              <div>
                <div className={styles.folderSectionHead}>
                  File Folder . <span>75</span>
                </div>
                <div className={styles.viewAll}>
                  <div>
                    <div>View all</div>
                    <img src="/img/my-project-user/viewalldown.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.filefolderSearch}>
                <img src="/img/my-project-user/search.svg" alt="" />
                <div className={styles.searchbardiv}>
                  <input type="search" placeholder="Search folder here..." className={styles.searchbar} />
                </div>
              </div>
            </div>
            <div className={styles.sortSection}>
              <div className={styles.sortList}>
                <img src="/img/my-project-user/sort.svg" alt="sort.svg" className={styles.sortIcon} />
                <div>Sort list</div>
              </div>
              <div className={styles.createFolder}>
                <img src="/img/my-project-user/foldertrans.svg" alt="foldertrans.svg" className={styles.foldertrans} />
                <div>Create folder</div>
              </div>
            </div>
          </div>
          <div className={styles.fileUploadsSectionMain}>
            <div className={styles.fileUploadsSection}>
              <div className={styles.fileUploadDiv}>
                <div className={styles.fileUpload}>
                  <img src="/img/my-project-user/Folder.svg" alt="folder.svg" />
                  <div className={styles.fileFolderTitle}>Site plans</div>
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
                  <img src="/img/my-project-user/Folder.svg" alt="folder.svg" />
                  <div className={styles.fileFolderTitle}>Interior</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnFileFolder;
