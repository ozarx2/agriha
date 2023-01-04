import FnprojectCardMob from "./projectCardMob";
import styles from "./main.module.css";

const FnUserMyprojectsile = ({ projects }) => {
  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.projMobSecMain}>
              <div className={styles.projBtnsMob}>
                <div className={styles.projBtnsOne}>Ongoing Projects</div>
                <div className={styles.projBtnsTwo}>Projects History</div>
              </div>
              {projects
                ?.slice(0)
                .reverse()
                .map((items, index) => {
                  return (
                    <div key={index}>
                      <FnprojectCardMob
                        index={index}
                        name={items.project_name}
                        place={items.creator.location}
                        budget={items?.project_requirements[0]?.budget}
                        area={items?.project_requirements[0]?.area}
                        bid={items.bid}
                        id={items._id}
                        architectId={items.architect_id}
                        status={items?.status}
                        startDate={items?.starting_date}
                        thumbnail={items?.thumbnail}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyprojectsile;
