import Head from "next/head";
import React from "react";
import ViewArchitect from "../components/ViewArchitect";

const viewArchitect = () => {
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
      <ViewArchitect />
    </div>
  );
};

export default viewArchitect;
