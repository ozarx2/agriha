import React from "react";
import moment from "moment/moment";

import styles from "./folder.module.css";

const FnFolderCard = ({ title, date, locked }) => {
  return (
    <div className={styles.fileUploadDiv}>
      {!locked ? (
        <div className={styles.fileUploadDiv_dataLock}>
          <img src="/img/my-project-user/lock.svg" alt="lock.svg" className={styles.lock} />
          <span>Locked</span>
        </div>
      ) : (
        ""
      )}

      <div className={styles.fileUpload}>
        <img src="/img/my-project-user/Folder.svg" alt="folder.svg" />
        <div className={styles.fileFolderTitle}>{title}</div>
        <div className={styles.fileFolderdate}>{moment(date).format("l")}</div>
      </div>
      {/* <div>
            <img src="/img/my-project-user/more.svg" alt="more.svg" className={styles.more} />
        </div> */}
    </div>
  );
};

export default FnFolderCard;
