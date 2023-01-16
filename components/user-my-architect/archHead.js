import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./archHead.module.css";

const ArchHead = (props) => {
  const [Store] = useContext(StoreContext);
  const router = useRouter();
  const setSearchQueryArchitect = Store.setSearchQueryArchitect;
  const searchQueryArchitect = Store.searchQueryArchitect;
  const setAllArchitects = Store.setAllArchitects;

  // store location
  useEffect(() => {
    setSearchQueryArchitect(props.s);
  }, [props]);

  const searchInputChange = (query) => {
    // console.log(query);
    if (query) {
      router.push(`/user-my-architect?s=${query}`, undefined, { shallow: true });
      setSearchQueryArchitect(query);
    } else {
      setAllArchitects([]);
      // setSearchQueryArchitect();
      router.push(`/user-my-architect`);
    }
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
                defaultValue={searchQueryArchitect}
                onChange={(e) => searchInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter location or architect name"
                id="architectSearchInput"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArchHead;
