/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import FnFileFolder from "./folders";
import FnPayment from "./payment";
import styles from "./project.module.css";
import FnSuggested from "./suggested";

const FnOngoingProjectUserSide = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleBtn = () => {
    setShowMore((prevState) => !prevState);
  };
  // if (typeof document !== "undefined") {
  //   if (showMore) {
  //     document.getElementById("more").style.opacity = "1";
  //     document.getElementById("less").style.opacity = "0";
  //     document.getElementById("projDetails").style.opacity = "1";
  //   } else {
  //     document.getElementById("more").style.opacity = "0";
  //     document.getElementById("less").style.opacity = "1";
  //     document.getElementById("projDetails").style.opacity = "0";
  //   }
  // }

  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.ongoingProjectSection}>
          <div className={styles.projectNameSection}>
            <div className={styles.projectName}>My Sweet Home</div>
            <div className={styles.projectId}>ARC8594</div>
          </div>
          <div className={styles.showMoreBtnSection}>
            <div className={styles.suggestion}>
              <div>
                <img src="/img/my-project-user/suggestion.svg" alt="suggestion.svg" /> Suggestion
              </div>
            </div>
            {/* <div
              id="more"
              className={styles.showMore}
              onClick={() => setShowMore(false)}
            >
              Show less
            </div> */}
            <div id="less" className={styles.showMore} onClick={toggleBtn}>
              {showMore ? "Show Less" : "Show More"}
              {/* <div
              id="less"
              className={styles.showMore}
              onClick={() => setShowMore(true)}
            >
              {showMore?
              'Show Less':'Show More'
            } */}

              {showMore ? (
                <img src="/img/my-project-user/showup.svg" alt="up.svg" />
              ) : (
                <img src="/img/my-project-user/showdown.svg" alt="down.svg" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.onGoingProjSectionMain}>
          <div className={styles.secOne}>
            <div className={styles.profileDpNameSection}>
              <div className={styles.profileNameSec}>
                <img src="/img/my-project-user/profile.svg" alt="profile.svg" />
                <div>Althaf Rahman</div>
              </div>
            </div>
            <div className={styles.profileStatusSection}>
              <div className={styles.profileStatusLeft}>
                <div className={styles.profileStatus}>Status:</div>
                <div className={styles.profileStatus}>Started on:</div>
                <div className={styles.profileStatus}>Current stage:</div>
                <div className={styles.profileStatus}>Payment status:</div>
              </div>
              <div className={styles.profileStatusRight}>
                <div className={styles.profileStatus}>In progress</div>
                <div className={styles.profileStatus}>25 Feb 2022(20 days ago)</div>
                <div className={styles.profileStatus}>3D designing</div>
                <div className={styles.profileStatus}>Pending</div>
              </div>
            </div>
          </div>
          <div className={styles.secTwo}>
            <div className={styles.fileUploadSectionArch}>
              <div>File upload to Architect</div>
            </div>
            <div className={styles.uploadDescSec}>
              <div className={styles.uploadDesc}>Enter description</div>
            </div>
            <div className={styles.dragDropSec}>
              <div className={styles.dragDrop}>
                Drag & drop <a href="">Browse</a>{" "}
              </div>
            </div>
            <div className={styles.fileButtonsSec}>
              <div className={styles.cancelBtn}>cancel</div>
              <div className={styles.uploadBtnMain}>
                <div className={styles.uploadBtn}>
                  <img src="/img/my-project-user/upload.svg" alt="upload.svg" className={styles.upload} />
                  Upload
                </div>
              </div>
            </div>
          </div>
          <div className={styles.secThree}>
            <div className={styles.fileFromArch}>
              <div className={styles.fileArchHead}>
                <div className={styles.fileTitle}>File from Architect</div>
                <div className={styles.archFilesMainSec}>
                  <div className={styles.fileList}>
                    <div>
                      <img src="/img/my-project-user/data.svg" alt="data.svg" />
                      Photograph.jpg
                    </div>
                  </div>
                  <div className={styles.dataDate}>27/10/2022</div>
                  <div className={styles.dataLock}>
                    <div>
                      <img src="/img/my-project-user/unlock.svg" alt="unlock.svg" />
                      Unlock file
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.projDetails} id="projDetails">
          {showMore ? (
            <div className={styles.projDetails} id="projDetails">
              <FnSuggested />
              <FnPayment />
              <FnFileFolder />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FnOngoingProjectUserSide;
