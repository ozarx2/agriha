import React from "react";
import Head from "next/head";
import BodyVerifyOtp from "../components/BodyVerifyOtp";

const verifyotp = () => {
  return (
    <div>
      <Head>
        <title>Verify OTP | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodyVerifyOtp />
    </div>
  );
};

export default verifyotp;
