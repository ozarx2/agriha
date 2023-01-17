/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./paymentLast.module.css";

const FnPaymentLast = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className={styles.paymentDetailes}>
        <div className={styles.paymentHead}>
          <div className={styles.paymentTitle}>Payment Detailes</div>
        </div>
        <div className={styles.paymentCardSectionMain}>
          <div className={styles.paymentCardSection}>
            <div className={styles.paymentCard}>
              <div className={styles.paymentStatus}>
                Latest Payment
                <img src="/img/my-project-user/info.svg" alt="info.svg" />
              </div>
              <div className={styles.paymentDate}>30/10/2021</div>
            </div>
            <div className={styles.paymentRate}>
              ₹ 25,000.00
              <span>Paid</span>
            </div>
            <div className={styles.paymentDetailesBtnSection}>
              <Link href={`/user-payment/${[id]}`} passHref>
                <div className={styles.paymentDetailesBtnOne}>View Bill</div>
              </Link>
              <div className={styles.paymentDetailesBtnTwo}>
                <span>
                  <img src="/img/my-project-user/download.svg" alt="download.svg" className={styles.download} />
                </span>
                Download Bill
              </div>
            </div>
          </div>
          {/* <div className={styles.currentPaymentCardSection}>
            <div className={styles.currentPaymentCard}>
              <div className={styles.currentPaymentStatus}>
                Current Payment
                <img src="/img/my-project-user/info.svg" alt="info.svg" />
              </div>
              <div className={styles.currentPaymentDate}>01/11/2021</div>
            </div>
            <div className={styles.currentPaymentRate}>
              ₹ 25,000.00
              <span>Pending</span>
            </div>
            <div className={styles.currentPaymentDetailesBtnSection}>
              <div className={styles.currentPaymentDetailesBtnOne}>Pay Now</div>
              <div className={styles.currentPaymentDetailesBtnTwo}>Pay on Direct</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FnPaymentLast;
