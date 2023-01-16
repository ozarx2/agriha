import { useRouter } from "next/router";
import React from "react";
import ArchHead from "./archHead";
import FnArchProfiles from "./archProfiles";
import FnFilter from "./filter";

import styles from "./main.module.css";
import FnArchPagination from "./pagination";

const FnUserMyArchitectDesktop = () => {
  const router = useRouter();
  const { location } = router.query;
  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <ArchHead location={location} />
            {/* <FnFilter /> */}
            <FnArchProfiles />
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectDesktop;
