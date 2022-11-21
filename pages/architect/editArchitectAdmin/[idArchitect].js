import Head from "next/head";
import React from "react";
import BodyEditArchitect from "../../../components/BodyEditArchitect";

const editArchitectAdmin = () => {
  return (
    <div>
      <Head>
        <title>Edit Architect | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodyEditArchitect />
    </div>
  );
};

export default editArchitectAdmin;
