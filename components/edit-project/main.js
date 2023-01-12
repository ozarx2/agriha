import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./main.module.css";

export default function EditProjectMain() {
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;
  console.log(projectId);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.editProjectMain}>
            <div className={styles.title_editProjectMain}>
              <h3>Edit Project</h3>
              <h4>Customize your Project details</h4>
            </div>
            <div className={styles.details_editProjectMain}>
              <div className={styles.thumbnail_editProjectMain}>
                <p>Thumbnail</p>
                <img
                  src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/why-study-architecture_0.jpg?itok=39f3QXWy"
                  alt="thumbnail"
                />
                <div className={styles.editThumbnail_editProjectMain}>
                  <FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
                  edit
                </div>
              </div>
              <div className={styles.inputContainer_editProjectMain}>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Project Name</p>
                  <input type="text" />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Project type</p>
                  <input type="text" />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Location</p>
                  <input type="text" />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Total area</p>
                  <input type="text" />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Hashtag</p>
                  <input type="text" />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Description</p>
                  <input type="text" />
                </div>
              </div>
              <div className={styles.imageConatiner_editProjectMain}>
                <div className={styles.imageBox_editProjectMain}>
                  <div className={styles.deleteImage_editProjectMain}>
                    <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                    Delete
                  </div>
                  <img
                    src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/why-study-architecture_0.jpg?itok=39f3QXWy"
                    alt="thumbnail"
                  />
                </div>
                <div className={styles.imageBox_editProjectMain}>
                  <div className={styles.deleteImage_editProjectMain}>
                    <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                    Delete
                  </div>
                  <img
                    src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/why-study-architecture_0.jpg?itok=39f3QXWy"
                    alt="thumbnail"
                  />
                </div>
                <div className={styles.imageBox_editProjectMain}>
                  <div className={styles.deleteImage_editProjectMain}>
                    <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                    Delete
                  </div>
                  <img
                    src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/why-study-architecture_0.jpg?itok=39f3QXWy"
                    alt="thumbnail"
                  />
                </div>
                <div className={styles.imageBox_editProjectMain}>
                  <div className={styles.deleteImage_editProjectMain}>
                    <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                    Delete
                  </div>
                  <img
                    src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/why-study-architecture_0.jpg?itok=39f3QXWy"
                    alt="thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
