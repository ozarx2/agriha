/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Head from "next/head";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import ProfilePopup from "../../components/user-common/profile-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import LoginPopup from "../../components/user-common/login-popup";

import styles from "../user-my-project/index.module.css";
import { useEffect } from "react";
import PaymentDetailsPopup from "../../components/user-my-project/paymentDetails-popup";
import SuggestProductSingle from "../../components/user-my-project/SuggestProductSingle";
import CartContainer from "../../components/user-my-project/CartContainer";
import CartPopUp from "../../components/user-my-project/CartPopUp";

const UserSingleProject = () => {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;
  const paymentDetailsPopUp = Store.paymentDetailsPopUp;
  const cartOpen = Store.cartOpen;

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Suggested Product</title>
        <meta name="description" content="Agriha Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container_outer}>
          <div className={styles.container_inner}>
            <div className={styles.header}>
              <AgrihaLandingHeaderNoSearch />
            </div>
            <div className={styles.main}>
              <SuggestProductSingle />
            </div>
          </div>
        </div>
        {loginPopup ? <LoginPopup /> : ""}
        {registerPopup ? <RegisterPopup /> : ""}
        {otpPopup ? <OtpPopup /> : ""}
        {profilePopup ? <ProfilePopup /> : ""}
        {paymentDetailsPopUp ? <PaymentDetailsPopup /> : ""}
        {cartOpen ? <CartPopUp /> : ""}
        <CartContainer />
      </div>
    </>
  );
};

export default UserSingleProject;
