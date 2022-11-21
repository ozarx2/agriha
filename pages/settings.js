import Head from "next/head";
import React from "react";
import MobileNav from "../components/MobileNav";
import Settings from "../components/Settings";

const settings = () => {
  return (
    <div>
      <Head>
        <title>Settings | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Settings />
      <MobileNav />
    </div>
  );
};

export default settings;
