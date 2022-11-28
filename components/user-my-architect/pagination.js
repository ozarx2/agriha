/* eslint-disable @next/next/no-img-element */
import styles from "./pagination.module.css";

const FnArchPagination = () => {
  return (
    <>
      <div className={styles.paginationSection}>
        <div className={styles.pageination}>
          <img src="/img/architect/left.svg" alt="left.svg" />
          <div className={styles.pageNum}>
            01 <span>of 03</span>
          </div>
          <img src="/img/architect/right.svg" alt="left.svg" />
        </div>
      </div>
    </>
  );
};

export default FnArchPagination;
