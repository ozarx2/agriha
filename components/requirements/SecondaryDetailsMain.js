import axios from "axios";
import React from "react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import api_url from "../../src/utils/url";
import styles from "./RequirementsMain.module.css";

const SecondaryDetailsMain = () => {
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storeDetails = () => {
    setPincode(document.getElementById("pincode").value);
    setDistrict(document.getElementById("district").value);
    setState(document.getElementById("state").value);
    setCountry(document.getElementById("country").value);
    setWorkLocation(document.getElementById("workLocation").value);
    setAddress(document.getElementById("address").value);
  };

  /* CREATE PROJECT */
  const handleSubmit = () => {
    setIsLoading(true);
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          secondary_details: [
            {
              pincode: pincode,
              district: district,
              state: state,
              country: country,
              work_location: workLocation,
              address: address,
            },
          ],
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          window.location.href = "/requirement/choose-plan";
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong please try again");
      });
  };

  const goToChoosePlan = () => {
    if (pincode !== "" && district !== "" && state !== "" && country !== "") {
      handleSubmit();
    } else {
      setIsError(true);
      setError("must fill all details");
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
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
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
              <p>Secondary Details</p>
              <div className={styles.inputRow}>
                <div className={styles.pincodeNdistrict_input_conatiner}>
                  <input type="tel" id="pincode" placeholder="Pincode*" onChange={storeDetails} />
                  <input type="text" id="district" placeholder="District*" onChange={storeDetails} />
                </div>
                <div className={styles.pincodeNdistrict_input_conatiner}>
                  <input type="text" id="state" placeholder="State*" onChange={storeDetails} />
                  <input type="text" id="country" placeholder="Country*" onChange={storeDetails} />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" id="workLocation" placeholder="Work location" onChange={storeDetails} />
                </div>
                <div className={styles.plot_input_conatiner}>
                  <input type="text" id="address" placeholder="Your Address" onChange={storeDetails} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom__main_inner__container}>
            {isError ? <p>{error}</p> : ""}
            <div className={styles.bottom__main_inner}>
              <div className={styles.contactUs_button}>Contact us</div>
              <div className={styles.save_button} onClick={goToChoosePlan}>
                {isLoading ? <PulseLoader color="#ffffff" /> : "Save & Continue"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondaryDetailsMain;
