import React from "react";
import moment from "moment";

import styles from "./suggestedMob.module.css";

const FnSuggestedMob = ({ suggestion }) => {
  console.log(suggestion);
  return (
    <div className={styles.bedProdMobMainSec}>
      <div className={styles.coloumn}>
        <img src="/img/my-project-user/mobile/bedprodmob.svg" alt="bedprodmob.svg" />
      </div>
      <div className={styles.coloumn}>
        <img src="/img/my-project-user/mobile/bedprodmob2.svg" alt="bedprodmob2.svg" />
      </div>
      <div className={styles.coloumn}>
        <img src="/img/my-project-user/mobile/pic3.svg" alt="bedprodmob.svg" />
      </div>
      <div className={styles.coloumn}>
        <img src="/img/my-project-user/mobile/pic4.svg" alt="bedprodmob2.svg" />
      </div>
    </div>
  );
};

export default FnSuggestedMob;
