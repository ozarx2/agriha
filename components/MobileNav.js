import { Logout } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import styles from "../styles/MobileNav.module.css";

const MobileNav = () => {
  const dashboard = () => {
    window.location.href = "/dashboard";
  };

  const settings = () => {
    window.location.href = "/settings";
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/"
  }

  return (
    <div className={styles.mobileNav}>
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
        <li onClick={logout} className={styles.page__slidebar__icon__logout}>
          <div className={styles.page__slidebar__icon}>
            <Image src="/logout.svg" alt="" width={20} height={20} />
          </div>
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
