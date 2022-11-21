import React from "react";
import styles from "./RequirementsMain.module.css";

const SecondaryDetailsMain = () => {
  const goToChoosePlan = () => {
    window.location.href = "/requirement/choose-plan";
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
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
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
              <p>Secondary Details</p>
              <div className={styles.inputRow}>
                <div className={styles.pincodeNdistrict_input_conatiner}>
                  <input type="tel" placeholder="Pincode*" />
                  <input type="text" placeholder="District*" />
                </div>
                <div className={styles.pincodeNdistrict_input_conatiner}>
                  <input type="text" placeholder="State*" />
                  <input type="text" placeholder="Country*" />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" placeholder="Work location*" />
                </div>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" placeholder="Location*" />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" placeholder="Your Address" />
                </div>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" placeholder="Your current Location" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToChoosePlan}>
              Save & Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondaryDetailsMain;
