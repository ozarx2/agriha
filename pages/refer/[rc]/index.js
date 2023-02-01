import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export default function AgrihaRefer() {
  const router = useRouter();
  const rc_id = router.query.rc;
  useEffect(() => {
    if (rc_id) {
      localStorage.setItem("rc", rc_id);
      router.push(`/`);
    }
  }, [router.query.rc]);
  return <></>;
}
