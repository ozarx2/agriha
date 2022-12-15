import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import api_url from "../../src/utils/url";
import styles from "./RequirementsMain.module.css";

const ChoosePlanMain = () => {
  const [planDetials, setPlanDetials] = useState([]);
  const [selectPlan, setSelectPlan] = useState(true);
  const [selected, setSelected] = useState("");
  const [planID, setPlanID] = useState("");
  const [serviceList, setServiceList] = useState([]);

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const [allservices, setAllServices] = useState([]);
  /* GET ALL SERVICES */
  async function getAllServices() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/paymentplans/allservices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setAllServices(data.plan_services);
  }

  useEffect(() => {
    getPlanDetails();
    getAllServices();
  }, []);

  const selectPlanClick = (id, index) => {
    setPlanID(id);
    setSelected(index);
  };

  useEffect(() => {
    document.getElementById("selectPlan").checked = true;
  }, []);

  const setRadio = (e) => {
    if (e.target.value === "selectPlan") {
      setSelectPlan(true);
      e.target.checked = true;
    } else {
      setSelectPlan(false);
      e.target.checked = true;
    }
  };

  const getValueChecked = (e) => {
    if (e.target.checked) {
      setServiceList((serviceList) => [...serviceList, e.target.value]);
    } else {
      serviceList.splice(serviceList.indexOf(e.target.value), 1);
    }
  };

  const goToFileUpload = () => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (selectPlan) {
      if (planID !== "") {
        setIsError(false);
        setIsLoading(true);
        axios
          .patch(
            `${api_url}/projects/update/${projectID}`,
            {
              plan_id: planID,
            },
            config
          )
          .then((response) => {
            if (response.data) {
              window.location.href = "/requirement/file-upload";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsError(true);
        setError("please choose a plan first");
      }
    } else {
      if (serviceList.length !== 0) {
        setIsError(false);
        setIsLoading(true);
        axios
          .patch(
            `${api_url}/projects/update/${projectID}`,
            {
              plan_services: serviceList,
            },
            config
          )
          .then((response) => {
            if (response.data) {
              window.location.href = "/requirement/file-upload";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsError(true);
        setError("must select your requirements");
      }
    }
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
              <h5>Select plan or Select requirements*</h5>
              <div className={styles.selectOrChoose__container}>
                <div className={styles.renovation_radio_conatiner}>
                  <div className={styles.complete_radio}>
                    <input type="radio" id="selectPlan" name="selectOrChoose" value="selectPlan" onClick={setRadio} />
                    <label htmlFor="selectPlan">Select Plan</label>
                  </div>
                  <div className={styles.complete_radio}>
                    <input
                      type="radio"
                      id="selectRequirements"
                      name="selectOrChoose"
                      value="selectRequirements"
                      onClick={setRadio}
                    />
                    <label htmlFor="selectRequirements">Select Requirements</label>
                  </div>
                </div>
              </div>
              {selectPlan ? (
                <div className={styles.plan_card_container}>
                  {planDetials?.map((item, index) => {
                    return (
                      <div key={index} className={styles.plan_card}>
                        <div className={styles.top_plan_card}>
                          <div className={styles.title_plan_card}>{item?.plan_name}</div>
                          <div className={styles.lists_plan_card}>
                            <ul>
                              {item?.plan_services?.map((service, index2) => {
                                return <li key={index2}>{service}</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                        {selected === index ? (
                          <div
                            id={`selectPlan${index}`}
                            className={styles.select_plan_cardSelected}
                            onClick={() => selectPlanClick(item?._id, index)}
                          >
                            Select Plan
                          </div>
                        ) : (
                          <div
                            id={`selectPlan${index}`}
                            className={styles.select_plan_card}
                            onClick={() => selectPlanClick(item?._id, index)}
                          >
                            Select Plan
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.serviceList_cards_container}>
                  {allservices?.map((item, index) => {
                    return (
                      <div key={index} className={styles.serviceList_card}>
                        <input type="checkbox" onClick={getValueChecked} value={item} />
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.bottom__main_inner__container}>
            {isError ? <p>{error}</p> : ""}
            <div className={styles.bottom__main_inner}>
              <div className={styles.contactUs_button}>Contact us</div>
              <div className={styles.save_button} onClick={goToFileUpload}>
                {isLoading ? <PulseLoader color="#ffffff" /> : "Save & Continue"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePlanMain;
