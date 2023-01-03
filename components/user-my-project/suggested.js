/* eslint-disable @next/next/no-img-element */
import styles from "./suggested.module.css";

const FnSuggested = () => {
  return (
    <>
      <div className={styles.suggestedMain}>
        <div className={styles.suggestedHead}>
          <div className={styles.suggestedTitle}>
            Suggested Products.
            <span>15</span>
          </div>
          <div className={styles.suggestedViewall}>
            <div>
              <div>View all</div>
              <img src="/img/my-project-user/viewallright.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.suggestedProductItemsSectionMain}>
          <div className={styles.suggestedProductItemsSection}>
            <div className={styles.suggestedProductItems}>
              <img src="/img/my-project-user/washbase.svg" alt="" />
              <div className={styles.productDetailes}>
                <div>
                  <div className={styles.productName}>Wash Base</div>
                  <div className={styles.productDate}>25 feb 2022 (20 days ago)</div>
                </div>
                <div className={styles.productRate}>₹4999.00</div>
              </div>
            </div>
          </div>
          <div className={styles.suggestedProductItemsSection}>
            <div className={styles.suggestedProductItems}>
              <img src="/img/my-project-user/sug1.svg" alt="" />
              <div className={styles.productDetailes}>
                <div>
                  <div className={styles.productName}>Side table</div>
                  <div className={styles.productDate}>25 feb 2022 (20 days ago)</div>
                </div>
                <div className={styles.productRate}>₹ 3999.00</div>
              </div>
            </div>
          </div>
          <div className={styles.suggestedProductItemsSection}>
            <div className={styles.suggestedProductItems}>
              <img src="/img/my-project-user/sug2.svg" alt="" />
              <div className={styles.productDetailes}>
                <div>
                  <div className={styles.productName}>Royal chair</div>
                  <div className={styles.productDate}>25 feb 2022 (20 days ago)</div>
                </div>
                <div className={styles.productRate}>₹ 5999.00</div>
              </div>
            </div>
          </div>
          <div className={styles.suggestedProductItemsSection}>
            <div className={styles.suggestedProductItems}>
              <img src="/img/my-project-user/sug3.svg" alt="" />
              <div className={styles.productDetailes}>
                <div>
                  <div className={styles.productName}>Dining table</div>
                  <div className={styles.productDate}>25 feb 2022 (20 days ago)</div>
                </div>
                <div className={styles.productRate}>₹ 14999.00</div>
              </div>
            </div>
          </div>
          <div className={styles.suggestedProductItemsSection}>
            <div className={styles.suggestedProductItems}>
              <img src="/img/my-project-user/washbase.svg" alt="" />
              <div className={styles.productDetailes}>
                <div>
                  <div className={styles.productName}>Wash Base</div>
                  <div className={styles.productDate}>25 feb 2022 (20 days ago)</div>
                </div>
                <div className={styles.productRate}>₹ 4999.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnSuggested;
