/* eslint-disable @next/next/no-img-element */
/* import StarRatings from "react-star-ratings"; */
import styles from "./index.module.css";

export default function AlsoViewedItems({
  url,
  name,
  rating_value,
  reviews,
  location,
  regno,
  id,
}) {
  const handleprofile = (id) => {
    window.location.href = `/profile#/${id}`;
    window.location.reload();
  };
  return (
    <div
      className={styles.also_viewed_item_outer}
      key={id}
      onClick={() => handleprofile(id)}
    >
      <img className={styles.profile_image} src={url} alt="logo-img" />
      <div className={styles.profile_head_right}>
        <h3>{name}</h3>
        <h5>{location}</h5>
        <p>{regno}</p>
      </div>
      <div className={styles.clear}></div>
    </div>
  );
}
