import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api_url from "../../src/utils/url";
import styles from "./RequirementsMain.module.css";

const ChoosePlanMain = () => {
  const [planDetials, setPlanDetials] = useState([]);

  const goToFileUpload = () => {
    window.location.href = "/requirement/file-upload";
  };

  const [planID, setPlanID] = useState("");
  const [services, setServices] = useState([]);

  /* GET PLAN DETAILS */
  async function getPlanDetails() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/paymentplans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setPlanDetials(data.data);
  }

  useEffect(() => {
    getPlanDetails();
  }, []);

  const selectPlanClick = (id, services) => {
    setPlanID(id);
    setServices(services);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.top__main_inner}>
            <div className={styles.left__main_inner}>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>1</span>
                  <p>Basic Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>2</span>
                  <p>Secondary Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>3</span>
                  <p>Choose Plan</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>Choose Plan</p>
              <div className={styles.plan_card_container}>
                {planDetials?.map((item, index) => {
                  return (
                    <div key={index} className={styles.plan_card}>
                      <div className={styles.top_plan_card}>
                        <div className={styles.title_plan_card}>
                          {item?.plan_name}
                        </div>
                        <div className={styles.lists_plan_card}>
                          <ul>
                            {item?.plan_services?.map((service, index2) => {
                              return <li key={index2}>{service}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                      <div
                        className={styles.select_plan_card}
                        onClick={() =>
                          selectPlanClick(item?._id, item?.plan_services)
                        }
                      >
                        Select Plan
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToFileUpload}>
              Save & Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePlanMain;
