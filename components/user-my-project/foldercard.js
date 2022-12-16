import React from "react";
import moment from "moment/moment";

import styles from "./folder.module.css";

const FnFolderCard = ({ title, date, fileLists }) => {
  return (
    <div className={styles.fileUploadDiv}>
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
