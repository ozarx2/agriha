/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../styles/chooseArchitect.module.css";
import Cardnav from "./Cardnav";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import api_url from "../src/utils/url";
import endpoint from "../src/utils/endpoint";

function ChooseArchitect() {
  const [architects, setArchitects] = useState([]);
  const [selectArchitectId, setSelectArchitectId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [query, setQuery] = useState("");

  const handleSelection = (id) => {
    setSelectArchitectId(id);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  async function getAllArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitects(data);
    document.getElementById("loaderNoDataFound").style.display = "none";
    if (data.length <= 0) {
      document.getElementById("noDataFound").style.display = "block";
    } else {
      document.getElementById("noDataFound").style.display = "none";
    }
  }

  useEffect(() => {
    var id = localStorage.getItem("projectId");
    setProjectId(id);
    getAllArchitect();
  }, []);

  async function getSearch() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/search/key?l=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitects(data.data);
    document.getElementById("loaderNoDataFound").style.display = "none";
    if (data.length <= 0) {
      document.getElementById("noDataFound").style.display = "block";
    } else {
      document.getElementById("noDataFound").style.display = "none";
    }
  }

  /* SEND MAIL TO USER */
  async function sendmail() {
    var id = localStorage.getItem("projectId");
    const token = localStorage.getItem("userToken");
    console.log(id);
    const res = await fetch(`${endpoint}/user/project_success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      window.location.href = "/dashboard";
    }
  }

  async function selectArchitect() {
    const token = localStorage.getItem("userToken");
    console.log("clicked");
    const res = await fetch(`${api_url}/projects/Choose_architect/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        architect_id: selectArchitectId,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      sendmail();
    }
  }

  const handleSubmit = () => {
    if (selectArchitectId !== null) {
      selectArchitect();
    } else {
      alert("choose your architect");
    }
  };

  const searchClick = () => {
    if (query !== "" && query.length >= 2) {
      getSearch();
    }
  };

  const viewProfileClick = (id) => {
    localStorage.setItem("viewArch", id);
    localStorage.setItem("isSettings", "false");
    window.location.href = `/profile#/${id}`;
  };

  const backbutton = () => {
    window.location.reload();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardMain}>
        <Cardnav description="Choose your Architect" title="Choose Architect" />
        <div className={styles.cardContent}>
          <div className={styles.cardContent__title}>
            <h3>Architects</h3>
            <div className={styles.cardContent__search}>
              <div className={styles.cardContent__searchIcon}>
                <Image alt="" src="/search.png" width={25} height={25} />
              </div>
              <input
                placeholder="Enter Name or Location"
                type="text"
                name=""
                id="searchInput"
                onChange={handleChange}
              />
              <div onClick={searchClick} className={styles.cardContent__search__input}>
                Search
              </div>
            </div>
          </div>
          <div className={styles.loader__container} id="loaderNoDataFound">
            <PulseLoader color="#05996d" />
          </div>
          <div className={styles.profileCard__container}>
            <p id="noDataFound" className={styles.profileCard__noArchitects}>
              No Architects Found
            </p>
            {architects?.map((items, index) => {
              return (
                <div key={index} className={styles.profileCard}>
                  <div
                    onClick={() => viewProfileClick(items._id)}
                    style={{
                      backgroundImage: `url(${
                        items.coverpic
                          ? items.coverpic
                          : "https://ictevangelist.com/wp-content/uploads/2013/01/sample-img.png"
                      })`,
                    }}
                    className={styles.profileCard__bg}
                  >
                    {selectArchitectId == items._id ? (
                      <div className={styles.selectedIndication}>
                        <Image alt="" src="/checkMark.svg" width={70} height={70} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.avatar__profileCard__container}>
                    {/*  <div
                      style={{
                        backgroundImage: `url(${
                          items.profilepic
                            ? items.profilepic
                            : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
                        })`,
                      }}
                      className={styles.avatar__profileCard}
                      onClick={() => viewProfileClick(items._id)}
                    ></div> */}
                    <img
                      className={styles.avatar__profileCard}
                      onClick={() => viewProfileClick(items._id)}
                      src={
                        items.profilepic
                          ? items.profilepic
                          : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
                      }
                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                      alt=""
                    />
                    <div>
                      <h5 onClick={() => viewProfileClick(items._id)}>
                        {items?.registered_id?.name
                          ? items?.registered_id?.name
                          : items.firstname + " " + items.lastname}
                      </h5>
                      <div onClick={() => handleSelection(items._id)} className={styles.viewProfile__button}>
                        SELECT
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsContainer__btns}>
              <div className={styles.buttonsContainer__rightBtn} onClick={backbutton}>
                Back
              </div>
              <div className={styles.buttonsContainer__rightBtn} onClick={handleSubmit}>
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseArchitect;
