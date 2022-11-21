import React from "react";
import Head from "next/head";
import BodyLogin from "../components/BodyLogin";

const login = () => {
  return (
    <div>
      <Head>
        <title>Login | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodyLogin />
    </div>
  );
};

export default login;
