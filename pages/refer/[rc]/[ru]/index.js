import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export default function AgrihaRefer() {
  const router = useRouter();
  const rc_id = router.query.rc;
  const ru_id = router.query.ru;
  useEffect(() => {
    if (rc_id && ru_id) {
      if (rc_id) {
        localStorage.setItem("rc", rc_id);
      }
      if (ru_id) {
        localStorage.setItem("ru", ru_id);
      }
      router.push(`/`);
    }
  }, [router.query]);
  return <></>;
}
