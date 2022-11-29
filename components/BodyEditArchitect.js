import React from "react";
import { PulseLoader } from "react-spinners";
import Archstyles from "../styles/BodyAddArchitect.module.css";
import registerstyles from "../styles/BodyRegister.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import { useState } from "react";
import Headerstyles from "../styles/Header.module.css";
import Image from "next/image";
import editArch from "../styles/BodyEditArchitect.module.css";
import { useEffect } from "react";
import api_url from "../src/utils/url";

const BodyEditArchitect = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");

  /* GET ARCHITECT */
  const [architectData, setArchitectData] = useState([]);

  async function getArchitect() {
    var archId = localStorage.getItem("idEditArch");
    const res = await fetch(`${api_url}/architects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitectData(data);
    setFname(data.firstname);
    setLname(data.lastname);
    setPhone(data.phone);
    setBio(data.bio);
    setEmail(data.email);
    setLocation(data.location);
    setWebsite(data.website);
    setProfileImg(data.profilepic);
    setCoverImg(data.coverpic);
  }

  useEffect(() => {
    getArchitect();
  }, []);

  /* Upload profile images */
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");

  function handleUpload(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/architects/${img.name}`);
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
          setUrl(url);
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
      /* setFile(event.target.files[0]); */
      handleUpload(event.target.files[0]);
    }
  };

  /* Upload Cover images */
  const [percentCover, setPercentCover] = useState(0);
  const [urlCover, setUrlCover] = useState("");

  function handleUploadCover(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/architects/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentCover(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setUrlCover(url);
          setCoverImg(url);
        });
      }
    );
  }

  const handleCoverImageChange = (event) => {
    console.log("onchange");
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      console.log(event.target.files[0]);
      /* setFile(event.target.files[0]); */
      handleUploadCover(event.target.files[0]);
    }
  };

  const storeValues = () => {
    setLname(document.getElementById("lname").value);
    setFname(document.getElementById("fname").value);
    setPhone(document.getElementById("phone").value);
    setBio(document.getElementById("bio").value);
    setEmail(document.getElementById("email").value);
    setLocation(document.getElementById("location").value);
    setWebsite(document.getElementById("web").value);
  };

  async function updateArchitect() {
    var archId = localStorage.getItem("idEditArch");
    const res = await fetch(`${api_url}/architects/${archId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        phone: phone,
        email: email,
        location: location,
        profilepic: profileImg,
        website: website,
        bio: bio,
        coverpic: coverImg,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      window.history.back();
    }
  }

  const nextClick = () => {
    document.getElementById("loadernextClickForm").style.display = "block";
    document.getElementById("nextButtonForm").style.display = "none";
    updateArchitect();
  };

  const viewAllArchs = () => {
    window.location.href = "/viewAllArchitects";
  };

  return (
    <div className={Archstyles.bodyRegister} style={{ backgroundImage: `url('/registerBg.jpg')` }}>
      <div className={registerstyles.header__bodyRegister}>
        <div className={Headerstyles.header__left}>
          <Image
            className={Headerstyles.header__logo}
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={100}
          />
        </div>
        <div onClick={viewAllArchs} className={Archstyles.viewAll}>
          View All Architects
        </div>
      </div>
      <div id="architectDetailsConatiner" className={Archstyles.architectDetailsConatiner}>
        <h2 className={Archstyles.fillData} style={{ color: "#ffffff" }}>
          Edit Architect
        </h2>
        <div className={Archstyles.content__bodyRegister}>
          <div className={Archstyles.inputs__container__bodyRegister}>
            <form className={registerstyles.form} action="" autoComplete="off">
              <div className={editArch.profilePhoto} style={{ backgroundImage: `url(${profileImg})` }}></div>
              <fieldset className={registerstyles.input__container}>
                <legend>Profile Image</legend>
                <div className={Archstyles.chooseImg}>
                  <input
                    onChange={handleImageChange}
                    id="profileImg"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="file"
                  />
                </div>
              </fieldset>
              <div className={editArch.coverPhoto} style={{ backgroundImage: `url(${coverImg})` }}></div>
              <fieldset className={registerstyles.input__container}>
                <legend>Cover Image</legend>
                <div className={Archstyles.chooseImg}>
                  <input
                    onChange={handleCoverImageChange}
                    id="coverImg"
                    type="file"
                    name="file"
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>First Name</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} defaultValue={fname} id="fname" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Last Name</legend>
                <div className={registerstyles.input__box}>
                  <input defaultValue={lname} onChange={storeValues} id="lname" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Email</legend>
                <div className={registerstyles.input__box}>
                  <input defaultValue={email} onChange={storeValues} id="email" type="email" />
                </div>
              </fieldset>
            </form>
          </div>
          <div className={registerstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <fieldset className={registerstyles.input__container}>
                <legend>Mobile number</legend>
                <div className={registerstyles.input__box}>
                  <input defaultValue={phone} onChange={storeValues} id="phone" type="tel" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Location</legend>
                <div className={registerstyles.input__box}>
                  <input defaultValue={location} onChange={storeValues} id="location" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Website</legend>
                <div className={registerstyles.input__box}>
                  <input defaultValue={website} onChange={storeValues} id="web" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Bio</legend>
                <div className={Archstyles.textarea}>
                  <textarea onChange={storeValues} maxLength={250} id="bio" type="text" defaultValue={bio} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className={Archstyles.buttonContainer}>
          <div
            style={{ marginBottom: "30px" }}
            onClick={nextClick}
            id="nextClickArch"
            className={Archstyles.nextButtonArchitect}
          >
            <div className={registerstyles.loader__container__register} id="loadernextClickForm">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="nextButtonForm">DONE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyEditArchitect;
