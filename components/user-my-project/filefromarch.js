import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import endpoint from "../../src/utils/endpoint";

import styles from "./filefromarch.module.css";

const FnFileFromArchDesk = ({ projectId }) => {
  const [documents, setDocuments] = useState([]);
  const [sliced, setSliced] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  async function getUploadedFiles() {
    const response = await fetch(`${endpoint}/fileupload/uploaded_file/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    var documentsForProject = data.data.filter((res) => res.project_id === projectId);
    setDocuments(documentsForProject);
    setSliced(documentsForProject?.slice(0, 3));
  }

  useEffect(() => {
    if (projectId) {
      getUploadedFiles();
    }
  }, [projectId]);

  const viewAllClick = () => {
    if (!viewAll) {
      setViewAll(true);
    } else {
      setViewAll(false);
    }
  };

  useEffect(() => {
    if (viewAll) {
      setSliced(documents);
    } else {
      setSliced(documents?.slice(0, 3));
    }
  }, [viewAll]);

  return (
    <>
      <div className={styles.fileTitle}>
        <div>File from Architect</div>
        <div className={styles.viewAll} onClick={() => viewAllClick()}>
          View all
        </div>
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
