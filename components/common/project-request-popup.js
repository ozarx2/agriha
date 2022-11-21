/* eslint-disable @next/next/no-img-element */
import styles from "./project-request-popup.module.css";

export default function ProjectRequestPopup({ setProjectRequestPopup }) {
  return (
    <>
      <div className={styles.OngoingPopupOuter}>
        <div
          onClick={() => setProjectRequestPopup(false)}
          className={styles.OngoingPopupClose}
        ></div>
        <div className={styles.OngoingPopupInner}>
          <div className={styles.heading}>
            <div className={styles.headingLeft}>
              <img src="/img/ongoing-project/profile.jpg" alt="profile" />
              <div className={styles.imageRight}>
                <div className={styles.main}>AR0235678</div>
                <div className={styles.sub}>Muammed Hashir</div>
              </div>
            </div>
            <div className={styles.headingRight}>
              <button>Residence</button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.sone}>
              <div className={styles.left}>
                <div className={styles.main}>Project starting</div>
                <div className={styles.sub}>15-Nov-2022</div>
              </div>
              <div className={styles.right}>
                <div className={styles.ignore}>
                  <span>Ignore</span>
                </div>
                <div className={styles.accept}>
                  <span>Accept</span>
                </div>
              </div>
            </div>
            <div className={styles.stwo}>
              <div className={styles.label}>Total area</div>
              <div className={styles.feildValue}>2500 sqft</div>
              <div className={styles.label}>Total budget</div>
              <div className={styles.feildValue}>50,00000</div>
            </div>
            <div className={styles.sthree}>
              <div
                onClick={() => setProjectRequestPopup(false)}
                className={styles.back}
              >
                Back
              </div>
              <div className={styles.sthree_right}>
                <div className={styles.report}>Report user</div>
                <div className={styles.send}>Send documents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
