import React from "react";
import styles from "./RequirementsMain.module.css";

const ChoosePlanMain = () => {
  const goToFileUpload = () => {
    window.location.href = "/requirement/file-upload";
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
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>Choose Plan</p>
              <div className={styles.plan_card_container}>
                <div className={styles.plan_card}>
                  <div className={styles.top_plan_card}>
                    <div className={styles.title_plan_card}>Basic Plan</div>
                    <div className={styles.lists_plan_card}>
                      <ul>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.select_plan_card}>Select Plan</div>
                </div>
                <div className={styles.plan_card}>
                  <div className={styles.top_plan_card}>
                    <div className={styles.title_plan_card}>Basic Plan</div>
                    <div className={styles.lists_plan_card}>
                      <ul>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.select_plan_card}>Select Plan</div>
                </div>
                <div className={styles.plan_card}>
                  <div className={styles.top_plan_card}>
                    <div className={styles.title_plan_card}>Basic Plan</div>
                    <div className={styles.lists_plan_card}>
                      <ul>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                        <li>Site plan</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.select_plan_card}>Select Plan</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToFileUpload}>
              Save & Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePlanMain;
