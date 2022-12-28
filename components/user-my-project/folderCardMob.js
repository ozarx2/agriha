import React from "react";
import moment from "moment/moment";

import styles from "./folderMob.module.css";

const FnFolderCardMob = ({ title, date, fileLists }) => {
  return (
    <div>
      {/* <FnFolderMob documents={documents} /> */}
      <div className={styles.filesMobSecMain}>
        <div className={styles.filesMobSec}>
          <div className={styles.fileImgNameSec}>
            <img src="img/my-project-user/mobile/folderMob.svg" alt="foldermob.svg" />
            <div className={styles.filesMobTitle}>
              <div>{title}</div>
              <small>{moment(date).format("l")}</small>
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
    </div>
  );
};

export default FnFolderCardMob;
