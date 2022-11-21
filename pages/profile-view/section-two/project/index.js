/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.css";

export default function Project({ url, title, id }) {
  const projectView = (id) => {
    localStorage.setItem("projectIdImage", id);
    window.location.href = "/projectArchitect";
  };

  return (
    <div onClick={() => projectView(id)} className={styles.projrct_outer}>
      <img src={url} alt="project" />
      <h3>{title}</h3>
    </div>
  );
}
