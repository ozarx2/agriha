/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./RequirementsMain.module.css";

const FileUploadMain = () => {
  const goToUserDash = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.top__main_inner}>
            <div className={styles.left__main_inner}>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>1</span>
                  <p>Basic Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>2</span>
                  <p>Secondary Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>3</span>
                  <p>Choose Plan</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>File Upload</p>
              <div className={styles.inputRow_fileUpload}>
                <div className={styles.left_inputRow_fileUpload}>
                  <input type="file" />
                  <div className={styles.inputRef}>Choose file</div>
                  <p>Upload Site Plan</p>
                </div>
                <div className={styles.uploadButton}>
                  Upload
                  <img src="/img/requirement/upload.svg" alt="" />
                </div>
              </div>
              <div className={styles.inputRow_fileUpload}>
                <div className={styles.left_inputRow_fileUpload}>
                  <input type="file" multiple />
                  <div className={styles.inputRef}>Choose files</div>
                  <p>Upload referace images (maximum: 3)</p>
                </div>
                <div className={styles.uploadButton}>
                  Upload
                  <img src="/img/requirement/upload.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToUserDash}>
              Send Requirement
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadMain;
