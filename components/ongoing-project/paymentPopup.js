import styles from "./paymentPopup.module.css";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import api_url from "../../src/utils/url";

function PaymentPopup() {
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;
  const [Store] = useContext(StoreContext);
  const setPaymentPopup = Store.setPaymentPopup;
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    amount: null,
    stage: "",
    status: "pending",
  };
  const [payableData, setPayableData] = useState(initialState);
  const handleInputs = (event) => {
    if (event.target.name === "amount") {
      setPayableData({ ...payableData, [event.target.name]: parseInt(event.target.value) });
    } else {
      setPayableData({ ...payableData, [event.target.name]: event.target.value });
    }
  };

  async function SubmitPaymentDetails() {
    if (projectId) {
      payableData.project_id = projectId;
      const response = await fetch(`${api_url}/user-payment`, {
        method: "POST",
        body: JSON.stringify(payableData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setPaymentPopup(false);
      }
    }
  }

  const handleSubmit = () => {
    if (!isNaN(payableData.amount) && payableData.amount != null && payableData.stage != "") {
      SubmitPaymentDetails();
      setIsLoading(true);
    }
  };

  return (
    <>
      <div className={styles.FileUploadPopupOuter}>
        <div className={styles.FileUploadPopupInner}>
          <div className={styles.heading}>
            {/* <img src="/img/architect-dashboard/file-upload.svg" alt="file-upload" /> */}
            <span>Payment</span>
          </div>
          <div className={styles.content}>
            <div className={styles.create_folder}>
              <div className={styles.one}>
                <input type="number" name="amount" placeholder="Enter payable amount." onChange={handleInputs} />
              </div>
              <div className={styles.one}>
                <input type="text" name="stage" placeholder="Enter stage of payment." onChange={handleInputs} />
              </div>
              <div className={styles.one}>
                <input type="text" name="stage" placeholder="Status" onChange={handleInputs} />
              </div>
              {/* {files.length === 0 ? (
                <div className={styles.two}>
                  <input type="file" accept="application/pdf" onChange={handleChange} />
                  <div className={styles.s_add_feild}>
                    <img src="/img/architect-dashboard/plus.svg" alt="file-upload" />
                    <span>Add file</span>
                  </div>
                </div>
              ) : (
                <div className={styles.three}>
                  <div className={styles.s_uploded_pdf}>
                    <img src="/img/architect-dashboard/pdf.svg" alt="uploaded pdf" />
                    <div>
                      <div>Selected Filename :{filenameUpload ? filenameUpload : " Please type filename above"}</div>

                      <div>Size : {(fileBeforeUpload.size / 1024).toFixed(2)} KB</div>
                    </div>
                  </div>
                </div>
              )} */}
              <div className={styles.three}>
                <div className={styles.clear} onClick={() => setPaymentPopup(false)}>
                  Cancel
                </div>
                <div className={styles.upload} onClick={handleSubmit}>
                  {isLoading ? (
                    <PulseLoader size={10} color="#ffffff" />
                  ) : (
                    <>
                      {/* <img src="/img/architect-dashboard/ofu.svg" alt="file-upload" /> */}
                      <span>Submit</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.FileUploadPopupClose}></div>
      </div>
    </>
  );
}

export default PaymentPopup;
