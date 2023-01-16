import React from "react";

import styles from "./main.module.css";

const FnUserPaymentDesktop = ({ projects }) => {
  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.title}>view bill</div>
            <table className={styles.table_out}>
              <tbody>
                <tr>
                  <td>Total sqft</td>
                  <td className={styles.tableDataResult}>: 30000</td>
                </tr>
                <tr>
                  <td>Rate / sqft</td>
                  <td className={styles.tableDataResult}>: 150</td>
                </tr>
                <tr>
                  <td>Total amount</td>
                  <td className={styles.tableDataResult}>: 10000</td>
                </tr>
                <tr>
                  <td>Payment detail</td>
                  <td className={styles.tableDataResult}>: --</td>
                </tr>
                <tr>
                  <td>Payable amount</td>
                  <td className={styles.tableDataResult}>: 10</td>
                </tr>
                <tr>
                  <td>Stage of payment</td>
                  <td className={styles.tableDataResult}>: stage</td>
                </tr>
                <tr>
                  <td>Status of payment</td>
                  <td className={styles.tableDataResult}>: status</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.btn}>Pay now</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserPaymentDesktop;
