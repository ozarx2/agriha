import Head from "next/head";
import React from "react";
import ArchitectVerify from "./ArchitectVerify";

const verify = () => {
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
      <ArchitectVerify />
    </div>
  );
};

export default verify;
