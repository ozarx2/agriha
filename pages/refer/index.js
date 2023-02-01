import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export default function AgrihaRefer() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/`);
  }, []);
  return <></>;
}
