/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import styles from "./suggested.module.css";

const FnSuggested = ({ suggestion }) => {
  return (
    <>
      <div className={styles.suggestedMain}>
        <div className={styles.suggestedHead}>
          <div className={styles.suggestedTitle}>
            Suggested Products.
            <span>{suggestion?.length}</span>
          </div>
          <div className={styles.suggestedViewall}>
            <div>
              <div>View all</div>
              <img src="/img/my-project-user/viewallright.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.suggestedProductItemsSectionMain}>
          {suggestion?.map((items, index) => {
            return (
              <div key={index} className={styles.suggestedProductItemsSection}>
                <div className={styles.suggestedProductItems}>
                  <img src={items.thumbnail} alt="thumbnail" />
                  <div className={styles.productDetailes}>
                    <div>
                      <div className={styles.productName}>{items.name}</div>
                      <div className={styles.productDate}>{moment(items.updatedAt).format("MMM Do YY")} </div>
                    </div>
                    <div className={styles.productRate}>₹ {items.mrp}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.test}>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
          <div>
            <div>hai</div>
            <div>hello</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnSuggested;
