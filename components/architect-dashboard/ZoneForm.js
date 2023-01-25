import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../StoreContext";
import { PulseLoader } from "react-spinners";
import endpoint from "../../src/utils/endpoint";
import zoneData from "../../src/utils/zone.json";
import { districts } from "../../src/utils/data";

import styles from "./UpdateZonePopUp.module.css";
import { useRouter } from "next/router";

export default function ZonePopupForm() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setUpdateZonePopUp = Store.setUpdateZonePopUp;
  const userRole = Store.userRole;

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Must fill all data");

  // Yaseen Start
  const [district, setDistrict] = useState("");
  const [Panchayath, setPanchayath] = useState("");
  const [zone, setZone] = useState("");

  const [panchayathList, setPanchayathLists] = useState([]);

  /* Zone selection API */

  async function handleSubmit() {
    var id = localStorage.getItem("architectId");
    const token = localStorage.getItem("architectToken");
    console.log(zone);

    const res = await fetch(`${endpoint}/architects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${token}`,
      },
      body: JSON.stringify({
        zone: zone,
        panchayath: Panchayath,
        district: district,
      }),
    });

    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.zone === zone) {
      setUpdateZonePopUp(false);
      router.reload();
    } else {
      handleSubmit(zone);
    }
  }

  const getPanchayaths = (district) => {
    var results = zoneData.list.filter((item) => item.district === district);

    const result = Object.entries(
      results.reduce((acc, { district, panchayth }) => {
        acc[district] = acc[district] ? acc[district] : [];
        acc[district].push(...panchayth);
        return acc;
      }, [])
    ).map((m) => ({ district: m[0], panchayth: [...new Set(m[1])] }));

    setPanchayathLists(result);
  };

  console.log(panchayathList);

  useEffect(() => {
    getPanchayaths(district);
    setZone("");
  }, [district]);

  const getZone = (val) => {
    var results = zoneData.list.filter((item) => item.panchayth.includes(val));
    setZone(results[0]?.zone);
  };

  useEffect(() => {
    getZone(Panchayath);
  }, [Panchayath]);

  function confirmClick() {
    console.log(district);
    console.log(Panchayath);
    console.log(zone);
    if (district !== "" && Panchayath !== "" && zone !== undefined && zone !== "") {
      setLoading(true);
      handleSubmit();
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      <div className={styles.stwo}>
        <label for="district">Select your District</label>
        <select name="districts" id="districts" onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {districts.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <label for="panchayaths">Select your Panchayath</label>
        <select name="panchayaths" id="panchayaths" onChange={(e) => setPanchayath(e.target.value)}>
          <option value="">Select Panchayath</option>
          {panchayathList[0]?.panchayth?.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <input type="text" id="zone" placeholder="Zone" readOnly defaultValue={zone ? `You are in ${zone} zone` : ""} />
        {isError ? <p>{error}</p> : ""}
        {loading ? (
          <div className={styles.submit}>
            <PulseLoader color="#ffffff" />
          </div>
        ) : (
          <div onClick={() => confirmClick()} className={styles.submit}>
            Confirm
          </div>
        )}
      </div>
    </>
  );
}
