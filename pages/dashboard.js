import React from "react";
import Head from "next/head";
import Dashboard from "../components/Dashboard";
import MobileNav from "../components/MobileNav";

const dashboard = () => {
  return (
    <div>
      <Head>
        <title>Dashboard | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
      <MobileNav />
    </div>
  );
};

export default dashboard;
