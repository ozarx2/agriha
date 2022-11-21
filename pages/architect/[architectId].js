import React from "react";
import Head from "next/head";
import ViewArchAdmin from "../../components/ViewArchAdmin";

const ArchitectId = () => {
  return (
    <div>
      <Head>
        <title>Architect | Agriha</title>
        <meta name="description" content="Architect | Agriha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewArchAdmin />
    </div>
  );
};

export default ArchitectId;
