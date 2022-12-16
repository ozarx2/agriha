import React from "react";
import styles from "./filefromarch.module.css";

const FnFileFromArchDesk = ({ sliced }) => {
  return (
    <>
      <div className={styles.fileTitle}>
        <div>File from Architect</div>
        <div className={styles.viewAll}>View all</div>
      </div>
      <div className={styles.archFilesMainSec}>
        {sliced.length !== 0 ? (
          sliced?.map((items, index) => {
            return (
              <div key={index} className={styles.archFilesMainSecInner}>
                <div className={styles.archFilesMainSecInner__top}>
                  <p>{items.title}</p>
                  {items?.payment_status ? (
                    <div className={styles.dataUnLock}>
                      <img src="/img/my-project-user/unlock.svg" alt="unlock.svg" className={styles.unlock} />
                      <a href={`${items.url}`}>
                        <span>Unlocked</span>
                      </a>
                    </div>
                  ) : (
                    <div className={styles.dataLock}>
                      <img src="/img/my-project-user/lock.svg" alt="lock.svg" className={styles.lock} />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
                {items?.files.map((file, key) => {
                  return (
                    <div className={styles.fileListOuter} key={key}>
                      <div className={styles.fileList}>
                        <img src="/img/my-project-user/data.svg" alt="data.svg" />
                        <span>{file.filename}</span>
                      </div>
                      <div className={styles.dataDate}>27/10/2022</div>
                      {items?.payment_status ? (
                        <div className={styles.dataDownload}>
                          <img src="/img/my-project-user/download.svg" alt="unlock.svg" className={styles.download} />
                          <a target="_blank" href={`${file?.url}`}>
                            <span>Download</span>
                          </a>
                        </div>
                      ) : (
                        <div className={styles.dataDownload}>
                          <span>Can't Download</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <>
            <p className={styles.found}>No file Found</p>
          </>
        )}
        {/* <div>
          <div className={styles.fileList}>
            <img src="/img/my-project-user/data.svg" alt="data.svg" />
            <span>Photograph.jpg</span>
          </div>
          <div className={styles.dataDate}>27/10/2022</div>
          <div className={styles.dataLock}>
            <img src="/img/my-project-user/mobile/downloadmob.svg" alt="unlock.svg" />
            <span>download</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default FnFileFromArchDesk;
