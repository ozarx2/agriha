import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import endpoint from "../src/utils/endpoint";
import styles from "../styles/Sidebar.module.css";

const SidebarDash = () => {
  const [userData, setUserData] = useState([]);

  const dashboard = () => {
    window.location.href = "/dashboard";
  };

  const settings = () => {
    window.location.href = "/settings";
  };

  /* User Details Get Api */
  async function getUser() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${endpoint}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setUserData(data.userData);
  }

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={styles.sidebarDash}>
      <div className={styles.avatar__sidebar}>
        <div
          style={
            userData?.profile_pic
              ? {
                  backgroundImage: `url('${userData?.profile_pic}')`,
                }
              : {
                  backgroundImage: `url('./person.png')`,
                }
          }
          className={styles.avatar__image}
        ></div>
        <div className={styles.profileDetails}>
          <h5>{userData?.registered_id?.name}</h5>
          <p></p>
        </div>
      </div>
      <div className={styles.pages__slidebar}>
        <ul>
          <li onClick={dashboard}>
            <div className={styles.page__slidebar__icon}>
              <Image src="/dash.svg" alt="" width={20} height={20} />
            </div>
            <p>Dashboard</p>
          </li>
          <li onClick={settings}>
            <div className={styles.page__slidebar__icon}>
              <Image src="/settings.svg" alt="" width={20} height={20} />
            </div>
            <p>Settings</p>
          </li>
        </ul>
      </div>
      <div className={styles.contact__slidebar}>
        <ul>
          <li>
            <a>
              <div className={styles.page__slidebar__icon}>
                <Image src="/callIconDash.svg" alt="" width={17} height={17} />
              </div>
              <p>+91 999 511 1325</p>
            </a>
          </li>
          <li>
            <div
              onClick={logout}
              className={styles.page__slidebar__icon__logout}
            >
              <div className={styles.page__slidebar__icon}>
                <Image src="/logout.svg" alt="" width={17} height={17} />
              </div>
              <p>Logout</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDash;
