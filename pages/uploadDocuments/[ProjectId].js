import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import UploadDocument from "../../components/UploadDocument";

const ProjectId = () => {
  const router = useRouter();
  const { ProjectId } = router.query;

  console.log(ProjectId);

  return (
    <div>
      <Head>
        <title>Upload Documents | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UploadDocument id={ProjectId} />
    </div>
  );
};

export default ProjectId;
