import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

export default function SinglePaymentProjectMain() {
  const [Store] = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  const initialState = {
    amount: null,
    stage: "",
  };

  const [paymentDetails, setPaymentDetails] = useState(initialState);
  const handleInputs = (event) => {
    if (event.target.name === "amount") {
      setPaymentDetails({ ...paymentDetails, [event.target.name]: parseInt(event.target.value) });
    } else {
      setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value });
    }
  };

  async function SubmitPaymentDetails() {
    if (projectId) {
      paymentDetails.project_id = projectId;
      const response = await fetch(`${api_url}/user-payment`, {
        method: "POST",
        body: JSON.stringify(paymentDetails),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      console.log(data);
    }
  }

  const handleSubmit = () => {
    if (paymentDetails.amount != null && paymentDetails.stage != "") {
      SubmitPaymentDetails();
    }
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>Add payment to project</div>
          <div className={styles.paymentColoumns}>
            <table className={styles.table_out}>
              <tbody>
                {/* <tr>
                  <td>Payment details </td>
                  <td className={styles.dropdownCol}>
                    <div className={styles.dropDown}>
                      :
                      <select name="cars" id="cars">
                        <option value="gpay">Gpay</option>
                        <option value="phonepay">Phonepay</option>
                        <option value="paytm">Paytm</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <button className={styles.addAcc}>Add account</button>
                  </td>
                </tr> */}
                <tr>
                  <td>Payable amount </td>
                  <td>
                    : <input type="number" name="amount" defaultValue={paymentDetails.amount} onChange={handleInputs} />
                  </td>
                </tr>
                <tr>
                  <td> Stage of payment </td>
                  <td>
                    :{" "}
                    <input
                      type="text"
                      name="stage"
                      defaultValue={paymentDetails.stage}
                      onChange={handleInputs}
                      placeholder="eg: Advance"
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td> Status of payment </td>
                  <td>
                    : <input type="text" name="status" defaultValue={paymentDetails.status} onChange={handleInputs} />
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className={styles.paymentMode}>
            <div className={styles.modeInput} onClick={handleSubmit}>
              Add payment
            </div>
          </div>
        </div>

        {/* {projectDetails?.length !== 0 ? (
          <div className={styles.main_inner}>
           
            
          </div>
        ) : (
          <div className={styles.main_inner}>
            <div className={styles.loading}>
              <img src="/img/landing/loading.svg" alt="Loading..." />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
