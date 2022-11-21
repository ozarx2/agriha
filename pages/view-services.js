import React from "react";
import Head from "next/head";
import ServicesPage from "../components/ServicesPage";

const servicesPage = () => {
  return (
    <div>
      <Head>
        <title>Architectural Services | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServicesPage />
    </div>
  );
};

export default servicesPage;
