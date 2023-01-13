/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import api_url from "../../src/utils/url";

import styles from "./main.module.css";

export default function SinglePaymentProjectMain({ isQuoted, setIsQuoted }) {
  const [Store] = useContext(StoreContext);
  const setBidDataPopup = Store.setBidDataPopup;
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;
  const options = ["Gpay", "Paytm", "Phonepay"];
  const defaultOption = options[0];

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>Add payment to project</div>
          <table className={styles.table_out}>
            <tbody>
              <tr>
                <td>Payment details </td>
                <td>
                  :
                  <Dropdown
                    className={styles.dropdown}
                    options={options}
                    // onChange={this._onSelect}
                    value={defaultOption}
                    placeholder="Select an option"
                  />
                </td>
              </tr>
              <tr>
                <td>Payable amount </td>
                <td>
                  : <input type="text" />
                </td>
              </tr>
              <tr>
                <td> Stage og payment </td>
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
