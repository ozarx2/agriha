/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import { StoreContext } from "../StoreContext";
import AgrihaArchProfileSingle from "./archProfile";

import styles from "./archProfiles.module.css";

const FnArchProfiles = () => {
  const [Store] = useContext(StoreContext);

  const searchQueryArchitect = Store.searchQueryArchitect;
  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;

  const router = useRouter();

  /* GET PROJECT TYPES */
  async function getallArchitects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setAllArchitects(data.data);
  }

  // console.log(allArchitects);
  useEffect(() => {
    if (allArchitects.length === 0) {
      getallArchitects();
    }
  }, []);

  async function getSearchArchitects(query) {
    const res = await fetch(`${api_url}/search/key?l=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });

    const data = await res.json();
    setAllArchitects(data.data);
  }

  useEffect(() => {
    if (searchQueryArchitect !== "") {
      getSearchArchitects(searchQueryArchitect);
      console.log(searchQueryArchitect);
    } else {
      if (allArchitects.length === 0) {
        getallArchitects();
      }
    }
  }, [searchQueryArchitect]);

  return (
    <>
      {allArchitects?.map((items, i) => {
        return <AgrihaArchProfileSingle key={i} items={items} i={i} />;
      })}
    </>
  );
};
export default FnArchProfiles;
