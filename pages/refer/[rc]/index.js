import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../../components/StoreContext";
import { useRouter } from "next/router";

export default function AgrihaRefer() {
  const router = useRouter();
  const rc_id = router.query.rc;

  const [Store] = useContext(StoreContext);
  const setRegisterPopup = Store.setRegisterPopup;
  const setUserRole = Store.setUserRole;

  useEffect(() => {
    if (rc_id) {
      localStorage.setItem("rc", rc_id);
      setUserRole("architect");
      setRegisterPopup(true);
      router.push(`/`);
    }
  }, [router.query.rc]);
  return <></>;
}
