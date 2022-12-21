import React from "react";
import styles from "../styles/ProjectView.module.css";
import registerstyles from "../styles/BodyRegister.module.css";
import { useState } from "react";
import { useEffect } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import endpoint from "../src/utils/endpoint";

const ProfileSettings = () => {
  const [userData, setUserData] = useState([]);

  /* User Details Get Api */
  async function getUser() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`https://agrihav2-test.onrender.com/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.userData?.profile_pic);
    setUserData(data.userData);
    setName(data.userData?.registered_id?.name);
    setProfession(data.userData?.profession);
    setLocation(data.userData?.location);
    setPincode(data.userData?.pincode);
    setAddress(data.userData?.Address);
    setCity(data.userData?.city);
    setDistrict(data.userData?.district);
    setState(data.userData?.state);
    setCountry(data.userData?.country);
    setProfileImg(data.userData?.profile_pic);
  }

  useEffect(() => {
    getUser();
  }, []);

  const [profileImg, setProfileImg] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setProfession(document.getElementById("profession").value);
    setLocation(document.getElementById("location").value);
    setPincode(document.getElementById("pincode").value);
    setAddress(document.getElementById("address").value);
    setCity(document.getElementById("city").value);
    setDistrict(document.getElementById("district").value);
    setState(document.getElementById("state").value);
    setCountry(document.getElementById("country").value);
  };

  /* Update user data */
  async function updateUser() {
    if (
      profileImg !== "" &&
      profession !== "" &&
      location !== "" &&
      pincode !== "" &&
      address !== "" &&
      city !== "" &&
      district !== "" &&
      state !== "" &&
      country !== ""
    ) {
      const token = localStorage.getItem("userToken");
      const res = await fetch(`${endpoint}/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${token}`,
        },
        body: JSON.stringify({
          profile_pic: profileImg,
          name: name,
          profession: profession,
          location: location,
          pincode: pincode,
          Address: address,
          city: city,
          district: district,
          state: state,
          country: country,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        window.location.href = "/dashboard";
      }
    } else {
      alert("Please enter your details");
    }
  }

  /* Upload user image */
  const [percent, setPercent] = useState(0);

  function handleUpload(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/agriha/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setProfileImg(url);
        });
      }
    );
  }

  const handleImageChange = (event) => {
    console.log("onchange");
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      console.log(event.target.files[0]);
      handleUpload(event.target.files[0]);
    }
  };

  const discardClick = () => {
    window.history.back();
  };

  return (
    <div className={styles.projectView}>
      <div className={styles.profileSettings}>
        <div className={styles.profileSettings__card}>
          <h3>Profile Settings</h3>
          <div className={styles.avatarContainer__profileSettings}>
            <div
              style={
                profileImg !== ""
                  ? {
                      backgroundImage: `url('${profileImg}')`,
                    }
                  : {
                      backgroundImage: `url('./person.png')`,
                    }
              }
              className={styles.imageProfile__profileSettings}
            ></div>
            <div className={styles.options__avatar__profileSettings}>
              <div style={{ cursor: "pointer" }} className={styles.editButton__profileSettings}>
                <input id="profileImg" type="file" accept="" onChange={handleImageChange} />
              </div>
            </div>
          </div>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Name</legend>
            <div className={registerstyles.input__box__settings}>
              <input id="name" type="text" defaultValue={name} style={{ color: "#000000" }} />
            </div>
          </fieldset>
        </div>
        <div className={styles.profileSettings__card_right}>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Mobile Number</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                value={userData?.registered_id?.phone}
                style={{ color: "#000000" }}
                id="phone"
                type="tel"
                readOnly
              />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Email</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                value={userData?.registered_id?.email}
                style={{ color: "#000000" }}
                id="email"
                type="email"
                readOnly
              />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Profession</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                onChange={storeValues}
                style={{ color: "#000000" }}
                id="profession"
                type="text"
                value={profession}
              />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Location</legend>
            <div className={registerstyles.input__box__settings}>
              <input onChange={storeValues} style={{ color: "#000000" }} id="location" type="text" value={location} />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Pincode</legend>
            <div className={registerstyles.input__box__settings}>
              <input onChange={storeValues} style={{ color: "#000000" }} id="pincode" type="text" value={pincode} />
            </div>
          </fieldset>
        </div>
        <div className={styles.profileSettings__card_right}>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Address</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                onChange={storeValues}
                style={{ color: "#000000" }}
                id="address"
                type="text"
                defaultValue={address}
              />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>City</legend>
            <div className={registerstyles.input__box__settings}>
              <input onChange={storeValues} style={{ color: "#000000" }} id="city" type="text" defaultValue={city} />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>District</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                onChange={storeValues}
                style={{ color: "#000000" }}
                id="district"
                type="text"
                defaultValue={district}
              />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>State</legend>
            <div className={registerstyles.input__box__settings}>
              <input onChange={storeValues} style={{ color: "#000000" }} id="state" type="text" defaultValue={state} />
            </div>
          </fieldset>
          <fieldset className={registerstyles.input__container__settings}>
            <legend style={{ color: "#4a4a4a" }}>Country</legend>
            <div className={registerstyles.input__box__settings}>
              <input
                onChange={storeValues}
                style={{ color: "#000000" }}
                id="country"
                type="text"
                defaultValue={country}
              />
            </div>
          </fieldset>
          <div className={styles.buttonContainer__profileSettings}>
            <div onClick={discardClick} style={{ cursor: "pointer" }} className={styles.discardButton}>
              DISCARD
            </div>
            <div style={{ cursor: "pointer" }} onClick={updateUser} className={styles.saveChangesButton}>
              SAVE CHANGES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
