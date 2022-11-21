import FnSOne from "./sone";
import FnSTwo from "./stwo";
/* import FnSThree from "./sthree"; */
import FnSFour from "./sfour";

import styles from "./main.module.css";

export default function ArchitectDashboardMain() {
  return (
    <>
      <div className={styles.main_outer}>
        <FnSOne />
        <FnSTwo />
        {/* <FnSThree /> */}
        <FnSFour />
      </div>
    </>
  );
}
