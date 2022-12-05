import React from "react";
import { useState } from "react";
import styles from "./filefromarchmob.module.css";

const FnFileFromArchMob = (projectId) => {
  const [fileData, setFileData] = useState(false);
  const [fileFromArch, setfileFromArch] = useState("");

  const toggleFileDataMob = (id) => {
    setFileData((prevState) => !prevState);
    setfileFromArch(id);
  };
  return (
    <>
      <div className={styles.fileFromMainMob}>
        <div className={styles.fileFromHead}>File from architect</div>
        <div className={styles.fileFromListMob} onClick={() => toggleFileDataMob(projectId)}>
          {fileData && fileFromArch === projectId ? (
            <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
          ) : (
            <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
          )}
        </div>
      </div>
      {fileData ? (
        <div className={styles.fileFromDataMainSecMob}>
          <div className={styles.fileFromDataMainMob}>
            <div className={styles.dataLeftMob}>
              <img src="/img/my-project-user/mobile/datatransmob.svg" alt="datatrans.svg" />
              Photograph.jpg
            </div>
            <div className={styles.dataRightMobUnlock}>
              <img src="/img/my-project-user/mobile/lockmob.svg" alt="unlock.svg" />
              Unlock file
            </div>
          </div>
          <div className={styles.fileFromDataMainMob}>
            <div className={styles.dataLeftMob}>
              <img src="/img/my-project-user/mobile/datatransmob.svg" alt="datatrans.svg" />
              Photograph.jpg
            </div>
            <div className={styles.dataRightMobDownload}>
              <img src="/img/my-project-user/mobile/downloadmob.svg" alt="downloadmob.svg" />
              Download
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FnFileFromArchMob;
