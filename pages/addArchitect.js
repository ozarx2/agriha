import React from "react";
import Head from "next/head";
import BodyAddArchitect from "../components/BodyAddArchitect";

const addArchitect = () => {
  return (
    <div>
      <Head>
        <title>Add Architect | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodyAddArchitect />
    </div>
  );
};

export default addArchitect;
