import StarRatings from "react-star-ratings";
import Link from "next/link";
import AgrihaArchitectRating from "../user-common/rating";

import styles from "./archProfiles.module.css";

function AgrihaArchProfileSingle({ items, i }) {
  const rating = AgrihaArchitectRating(items._id);
  const coverpics = () => {
    return items?.coverpic ? items?.coverpic : "/img/landing/nophoto.jpg";
  };
  return (
    <div key={i} className={styles.archProfileMultipleViewMain}>
      <Link href={`/user-architect-about/${items._id}`} passHref>
        <div className={styles.archProfileMultipleView}>
          <div
            className={styles.archProfileMultipleViewImg}
            style={{ backgroundImage: `url(${coverpics()}), url("/img/landing/nophoto.jpg")` }}
          ></div>
          <div className={styles.archProfileDesignPic}>
            <div className={styles.archProfileSection}>
              <div className={styles.arcProfileGroupSection}>
                <img
                  src={items?.profilepic ? items?.profilepic : "/img/landing/profile_img.svg"}
                  onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                  alt="profilepic.svg"
                  className={styles.archProPic}
                />
                <div className={styles.archProfileGroup}>
                  <div className={styles.archGroupName}>
                    {items?.registered_id?.name ? items?.registered_id?.name : items.firstname + " " + items.lastname}
                  </div>
                  <div className={styles.archGroupSubHead}>
                    <div className={styles.ratingNumber}>{rating.rate}</div>
                    <StarRatings
                      rating={rating.rate}
                      starRatedColor="#edbc3b"
                      numberOfStars={5}
                      starDimension="14px"
                      starSpacing="1.5px"
                      name="rating"
                    />
                    <div className={styles.ratingReviews}>{rating.review} Reviews</div>
                  </div>
                </div>
              </div>
              <div className={styles.viewProfile}>
                <div className={`${styles.viewProfileBtn}`}>View Profile</div>
              </div>
            </div>
            <div>
              {items?.location ? (
                <div className={styles.archLocationMain}>
                  <img
                    src="/img/architect/locationblue.svg"
                    alt="locationblue.svg"
                    className={styles.locationIconGreen}
                  />
                  <div className={styles.archlocation}>{items?.location}</div>
                </div>
              ) : (
                ""
              )}
              <div className={styles.category}>
                <div>Architect</div>
              </div>
              <div className={styles.categorySubhead}>
                <div>{items?.bio}</div>
              </div>
              {/* {items?.bio ? (
              <Link href={`/user-architect-about/${items._id}`} passHref>
                <div className={styles.readMore}>
                  <div>Read more</div>
                  <img src="/img/architect/downarrow.svg" alt="downarrow.svg" className={styles.categoryDownIcon} />
                </div>
              </Link>
            ) : (
              ""
            )} */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default AgrihaArchProfileSingle;
