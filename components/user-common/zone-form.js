import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../components/StoreContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import endpoint from "../../src/utils/endpoint";
import zoneData from "../../src/utils/zone.json";
import { districts } from "../../src/utils/data";

import styles from "./zone-popup.module.css";
import { useRouter } from "next/router";

export default function ZonePopupForm() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setZonePopUp = Store.setZonePopUp;
  const userRole = Store.userRole;
  const updateZonePopUp = Store.updateZonePopUp;
  const setUpdateZonePopUp = Store.setUpdateZonePopUp;

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
      setZonePopUp(false);
      window.location.href = `/architect-dashboard/${data._id}`;
    } else {
      handleSubmit(zone);
    }
  }

  async function handleSubmitUser() {
    console.log(zone);
    if (zone !== "") {
      const token = localStorage.getItem("userToken");

      const res = await fetch(`${endpoint}/user/update`, {
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
      setLoading(false);
      if (data.status === 200) {
        if (updateZonePopUp) {
          setZonePopUp(false);
          setUpdateZonePopUp(false);
          router.reload();
        } else {
          setZonePopUp(false);
          window.location.href = "/requirement/basic-details";
        }
      }
    }
  }

  function confirmClick() {
    if (district !== "" && Panchayath !== "" && zone !== "" && zone !== undefined) {
      setLoading(true);
      if (userRole === "user") {
        handleSubmitUser();
      } else {
        handleSubmit();
      }
    } else {
      setIsError(true);
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

    var value = result[0]?.panchayth;

    var sortedArray = value.sort(sortedArray);

    setPanchayathLists(value);
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

  return (
    <>
      <div className={styles.stwo}>
        <label for="district">Select your District</label>
        <select name="districts" id="districts" onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {districts
            .slice(0)
            .reverse()
            .map((item, index) => {
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
          {panchayathList?.map((item, index) => {
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
