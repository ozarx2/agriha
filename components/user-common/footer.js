import styles from "./footer.module.css";

export default function LandingFooter() {
  return (
    <>
      <div className={styles.footer_outer}>
        <div className={`container ${styles.container} ${styles.footer}`}>
          <div className={styles.footer_inner}>© Copyright 2024 Agriha.com. All rights reserved.</div>
        </div>
      </div>
    </>
  );
}
