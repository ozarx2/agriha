import React from "react";
import HeaderLogin from "./HeaderLogin";
import styles from "./Admin.module.css";
import { useState } from "react";

const BodyLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setPassword(document.getElementById("password").value);
  };

  const loginClick = () => {
    if (name !== "" && password !== "") {
      if (name === "Admin001") {
        document.getElementById("errorAdminLogin").style.display = "none";
        if (password === "AdminPass821#") {
          document.getElementById("errorAdminLogin").style.display = "none";
          localStorage.setItem("AdminLogin", "adminLogin");
          window.location.href = "/admin/dashboard";
        } else {
          document.getElementById("errorAdminLogin").style.display = "block";
          document.getElementById("errorText").innerHTML = "incorrect password";
        }
      } else {
        document.getElementById("errorAdminLogin").style.display = "block";
        document.getElementById("errorText").innerHTML =
          "Please enter a valid Name";
      }
    } else {
      document.getElementById("errorAdminLogin").style.display = "block";
    }
  };

  return (
    <div className={styles.bodyLogin}>
      <HeaderLogin />
      <div className={styles.container__bodyLogin}>
        <h3>Admin Login</h3>
        <div className={styles.inputContainer}>
          <p>Name*</p>
          <input type="text" id="name" onChange={storeValues} />
        </div>
        <div className={styles.inputContainer}>
          <p>Password*</p>
          <input type="password" id="password" onChange={storeValues} />
        </div>
        <div className={styles.errorContainer} id="errorAdminLogin">
          <p id="errorText">All fields *Required</p>
        </div>
        <div onClick={loginClick} className={styles.loginButton}>
          LOGIN
        </div>
      </div>
    </div>
  );
};

export default BodyLogin;
