import Image from "next/image";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./archHead.module.css";

const ArchHead = () => {
  const [Store] = useContext(StoreContext);

  const setSearchQueryArchitect = Store.setSearchQueryArchitect;

  const searchInputChange = (query) => {
    setSearchQueryArchitect(query);
  };

  return (
    <>
      <div className={styles.container_inner}>
        <div className={styles.architectHead}>
          <div className={styles.arcHeadOne}>Find architects and home designers near me</div>
          <div className={styles.arcSubHeadOne}>
            Don’t know how to begin? See our <span className={styles.arcSubHeadOneDemo}>Demo instruction </span>
            for more information
          </div>
        </div>
        <div className={styles.architectHead}>
          <div className={styles.arcHeadtwo}>
            Find best architect for your project
            <span className={styles.search_outer}>
              <span className={styles.search}>
                <Image src="/img/architect/location.svg" alt="search" width={18} height={18} />
              </span>
              <input
                type="text"
                onChange={(e) => searchInputChange(e.target.value)}
                placeholder="Enter location or architect name"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArchHead;
