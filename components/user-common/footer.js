import styles from "./footer.module.css";

export default function LandingFooter() {
  const years = new Date().getFullYear();
  return (
    <>
      <div className={styles.footer_outer}>
        <div className={`container ${styles.container} ${styles.footer}`}>
          <div className={styles.footer_inner}>© Copyright {years} Agriha.com. All rights reserved.</div>
        </div>
      </div>
    </>
  );
}
