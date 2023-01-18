import React, { useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";

import styles from "./main.module.css";

export default function SinglePaymentProjectMain() {
  const [Store] = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>Add payment to project</div>
          <div className={styles.paymentColoumns}>
            <table className={styles.table_out}>
              <tbody>
                <tr>
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
                </tr>
                <tr>
                  <td>Payable amount </td>
                  <td>
                    : <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td> Stage of payment </td>
                  <td>
                    : <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td> Status of payment </td>
                  <td>
                    : <input type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.paymentMode}>
            <div className={styles.modeInput}>Add payment</div>
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
