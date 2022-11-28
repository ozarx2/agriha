import styles from "./filter.module.css";

const FnFilter = () => {
  return <>
  <div className={styles.filterSectionMain}>
            <div className={styles.filterSection}>
              <div className={styles.filterDivLeft}>
                <div className={styles.allFilter}>
                  <img
                    src="/img/architect/filter.svg"
                    alt="filter.svg"
                    className={styles.filterIcon}
                  />
                  <div>All Filters</div>
                </div>
                <div className={styles.allSort}>
                  <img
                    src="/img/architect/sort.svg"
                    alt="sort.svg"
                    className={styles.sortIcon}
                  />
                  <div>Sort list</div>
                </div>
                <div className={styles.allCategory}>
                  <div>Professional category</div>
                  <img
                    src="/img/architect/downarrow.svg"
                    alt="downarrow.svg"
                    className={styles.categoryIcon}
                  />
                </div>
              </div>
              <div className={styles.filterDivRight}>
                <div className={styles.pagination}>
                  1 – 15 of 2,558 professionals
                </div>
              </div>
            </div>
          </div>
  </>;
};
export default FnFilter;
