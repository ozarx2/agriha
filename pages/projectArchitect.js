import Head from 'next/head'
import React from 'react'
import ViewProjectArch from '../components/ViewProjectArch'

const projectArchitect = () => {
  return (
    <div>
        <Head>
        <title>View Project Architect | Agriha</title>
        <meta
          name="description"
          content="Online Architecture Services | Arclif"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewProjectArch />
    </div>
  )
}

export default projectArchitect