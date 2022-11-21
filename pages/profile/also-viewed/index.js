import { useEffect, useState } from "react";
import api_url from "../../../src/utils/url";
import styles from "./index.module.css";
import AlsoViewedItems from "./items";

export default function AlsoViewed(architectId) {
  const [architects, setArchitects] = useState([]);
  async function getAll_architects() {
    const api = await fetch(`${api_url}/architects/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
      },
    });
    const response = await api.json();
    if (response) {
      setArchitects(response);
    }
  }
  useEffect(() => {
    getAll_architects();
  }, []);

  const Suggestions = architects.map((items, index) => {
    if (items._id === architectId.id) {
    } else {
      return (
        <>
          {items.registered_id ? (
            <AlsoViewedItems
              id={items._id}
              url={
                items.profilepic
                  ? items.profilepic
                  : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
              }
              name={items?.registered_id?.name}
              rating_value={3.5}
              reviews={2}
              regno={items.regno}
              location={items.location}
            />
          ) : (
            <AlsoViewedItems
              id={items._id}
              url={
                items.profilepic
                  ? items.profilepic
                  : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
              }
              name={items.firstname + " " + items.lastname}
              rating_value={3.5}
              reviews={2}
              regno={items.regno}
              location={items.location}
            />
          )}
        </>
      );
    }
  });

  return (
    <div className={styles.also_viewed_outer}>
      <div className={styles.first}>
        <div className={styles.heading}>
          <h4>Suggestions</h4>
          {/* <button>View all</button> */}
        </div>
        <div className={styles.suggessions__container}>{Suggestions}</div>
      </div>
    </div>
  );
}
