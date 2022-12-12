import React from "react";
import styles from "./filefromarch.module.css";

const FnFileFromArchDesk = () => {
  return (
    <>
      <div className={styles.fileTitle}>
        <div>File from Architect</div>
        <div className={styles.viewAll}>View all</div>
      </div>
      <div className={styles.archFilesMainSec}>
        <div>
          <div className={styles.fileList}>
            <img src="/img/my-project-user/data.svg" alt="data.svg" />
            <span>Photograph.jpg</span>
          </div>
          <div className={styles.dataDate}>27/10/2022</div>
          <div className={styles.dataLock}>
            <img src="/img/my-project-user/unlock.svg" alt="unlock.svg" />
            <span>Unlock file</span>
          </div>
        </div>
        <div>
          <div className={styles.fileList}>
            <img src="/img/my-project-user/data.svg" alt="data.svg" />
            <span>Photograph.jpg</span>
          </div>
          <div className={styles.dataDate}>27/10/2022</div>
          <div className={styles.dataLock}>
            <img src="/img/my-project-user/unlock.svg" alt="unlock.svg" />
            <span>Unlock file</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnFileFromArchDesk;
