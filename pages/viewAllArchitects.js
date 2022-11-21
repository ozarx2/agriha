import Head from "next/head";
import React from "react";
import ViewAllArchs from "../components/ViewAllArchs";

const viewAllArchitects = () => {
  return (
    <div>
      <Head>
        <title>View All Architects | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewAllArchs />
    </div>
  );
};

export default viewAllArchitects;
