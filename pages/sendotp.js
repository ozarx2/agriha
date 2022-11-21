import React from "react";
import Head from "next/head";
import Register from "../components/Register";

const sendotp = () => {
  return (
    <div>
      <Head>
        <title>Register | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register />
    </div>
  );
};

export default sendotp;
