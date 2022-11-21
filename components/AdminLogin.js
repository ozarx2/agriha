import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import HeaderLogin from "./admin/HeaderLogin";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storeValues = () => {
    setUsername(document.getElementById("username").value);
    setPassword(document.getElementById("password").value);
  };

  const loginClick = () => {
    if (username === "adminArclif" && password === "AdminPass821#") {
      document.getElementById("errorAdminLogin").style.display = "none";
      document.getElementById("loaderLoginAdmin").style.display = "flex";
      document.getElementById("loginAdmin").style.display = "none";
      localStorage.setItem("AdminLogin", "adminLogin");
      window.location.href = "/addArchitect";
    } else {
      document.getElementById("errorAdminLogin").style.display = "flex";
      document.getElementById("errorAdminLogin").style.color = "red";
    }
  };

  return (
    <div className={styles.adminLogin}>
      <HeaderLogin />
    </div>
  );
};

export default AdminLogin;
