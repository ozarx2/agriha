import Head from "next/head";
import React from "react";
import ArchitectLogin from "./ArchitectLogin";

const login = () => {
  return (
    <div>
      <Head>
        <title>Login Architect</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArchitectLogin />
    </div>
  );
};

export default login;
