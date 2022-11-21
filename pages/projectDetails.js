import Head from "next/head";
import React from "react";
import MobileNav from "../components/MobileNav";
import ProjectDetails from "../components/ProjectDetails";

const projectDetails = () => {
  return (
    <div>
      <Head>
        <title>Project Details | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectDetails />
      <MobileNav />
    </div>
  );
};

export default projectDetails;
