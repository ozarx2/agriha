import React from "react";
import Head from "next/head";
import BodyVerifyOtpLogin from "../components/BodyVerifyOtpLogin";

const verifyotplogin = () => {
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
      <BodyVerifyOtpLogin />
    </div>
  );
};

export default verifyotplogin;
