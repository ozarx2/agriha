import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import PaymentUserMyprojectCurrent from "./PaymentUserInProjectCurrent";
import PaymentUserMyprojectHistory from "./PaymentUserInProjectHistory";

import styles from "./PaymentUserMyproject.module.css";

const PaymentUserMyproject = () => {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const setUserPaymentPopup = Store.setUserPaymentPopup;

  const [navActive, setNavActive] = useState("currentPayment");
  const [productId, setProductId] = useState("");
  const [allHistory, setAllHistory] = useState([]);
  const [currentPayment, setCurrentPayment] = useState([]);
  const [historyPayment, setHistoryPayment] = useState([]);

  /* GET PROJECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProductId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  const historyClick = () => {
    setNavActive("history");
  };

  const paymentClick = () => {
    setNavActive("currentPayment");
  };

  async function getPaymentHistory() {
    const response = await fetch(
      `${api_url}/user-payment/getbyproject/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setAllHistory(data.data);
    var nothistory = data.data.filter((res) => res.status === "pending");
    setCurrentPayment(nothistory);
    var hisory = data.data.filter((res) => res.status !== "pending");
    setHistoryPayment(hisory);
  }

  const [getAllBidResult, setGetAllBidResult] = useState([]);

  async function getAllBidResults(id) {
    const response = await fetch(`${api_url}/quotation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    if (data) {
      const temp = data.data;
      setGetAllBidResult(temp);
    }
  }

  useEffect(() => {
    if (productId !== "") {
      getPaymentHistory();
    }
  }, [productId]);

  return (
    <div className={styles.paymentContainer_main}>
      <div className={styles.options_sidebar_payment}>
        <div className={styles.title_option}>
          {navActive === "currentPayment" ? (
            <>
              <p>Current payment</p>
              <img src="/img/user-my-project/arrow2.svg" />
            </>
          ) : (
            <>
              <h5 onClick={paymentClick}>Current payment</h5>
            </>
          )}
        </div>
        <div className={styles.content_option}>
          {navActive === "history" ? (
            <>
              <p>History</p>
              <img src="/img/user-my-project/arrow2.svg" />
            </>
          ) : (
            <>
              <h5 onClick={historyClick}>History</h5>
            </>
          )}
        </div>
      </div>
      <div className={styles.main_container_payment}>
        {navActive === "currentPayment" ? (
          <>
            {currentPayment.map((item, index) => {
              return <PaymentUserMyprojectCurrent item={item} key={index} />;
            })}
          </>
        ) : navActive === "history" ? (
          <>
            {historyPayment.length !== 0 ? (
              <>
                {historyPayment.map((item, index) => {
                  return (
                    <PaymentUserMyprojectHistory item={item} key={index} />
                  );
                })}
              </>
            ) : (
              <div className={styles.noHistory}>No payment history</div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentUserMyproject;
