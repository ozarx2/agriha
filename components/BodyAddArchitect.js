import Image from "next/image";
import React, { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import registerstyles from "../styles/BodyRegister.module.css";
import Headerstyles from "../styles/Header.module.css";
import Archstyles from "../styles/BodyAddArchitect.module.css";
import { useState } from "react";
import styles from "../styles/BodyAddArchitect.module.css";
import editArch from "../styles/BodyEditArchitect.module.css";
import endpoint from "../src/utils/endpoint";
import api_url from "../src/utils/url";
import dummy_token from "../src/utils/dummy_token";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import HeaderDashboard from "./admin/HeaderDashboard";

const BodyAddArchitect = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [verified, setVerified] = useState(false);
  const [website, setWebsite] = useState("");

  const [archId, setArchId] = useState("");

  const [count, setCount] = useState(1);

  const [allProjects, setAllProjects] = useState([]);

  const storeValues = () => {
    setLname(document.getElementById("lname").value);
    setFname(document.getElementById("fname").value);
    setPhone(document.getElementById("phone").value);
    setBio(document.getElementById("bio").value);
    setEmail(document.getElementById("email").value);
    setLocation(document.getElementById("location").value);
    setWebsite(document.getElementById("web").value);
  };

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

  async function addArchitect() {
    const res = await fetch(`${api_url}/architects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        phone: `91${parseInt(phone)}`,
        email: email,
        location: location,
        regno: null,
        verified: verified,
        profilepic: url,
        website: website,
        bio: bio,
        coverpic: urlCover,
      }),
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === 200) {
      document.getElementById("projectDetailsContainer").style.display = "block";
      document.getElementById("architectDetailsConatiner").style.display = "none";
      setArchId(data.data._id);
    }
  }

  const nextClick = () => {
    if (fname !== "" && lname !== "" && phone !== "" && bio !== "" && email !== "" && location !== "" && url !== "") {
      document.getElementById("errorDetailsArch").style.display = "none";
      document.getElementById("loadernextClickForm").style.display = "block";
      document.getElementById("nextButtonForm").style.display = "none";
      addArchitect();
    } else {
      document.getElementById("errorDetailsArch").style.display = "flex";
    }
  };

  const [projectImages, setProjectImages] = useState([]);

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

  /* Upload project images */
  const [percentProject, setPercentProject] = useState(0);

  function handleUploadProject(img) {
    document.getElementById("progressProject").style.display = "block";
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/projects/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentProject(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          addImages(url);
          document.getElementById("progressProject").style.display = "none";
        });
      }
    );
  }

  /* Multiple Image Select Post */
  const [files, setFiles] = useState([]);

  var fileObj = [];
  var fileArray = [];

  const uploadMultipleFiles = (e) => {
    console.log("access input post");
    if (e.target.files.length <= 6) {
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        handleUploadProject(fileObj[0][i]);
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setFiles(fileArray);
      console.log(fileArray);
    } else {
      alert("Cannot add more than 6 pictures");
    }
  };

  const [projectTile, setProjectTitle] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectArea, setProjectArea] = useState("");

  const storeProjectValues = () => {
    setProjectTitle(document.getElementById("projectTitle").value);
    setProjectLocation(document.getElementById("projectLocation").value);
    setProjectArea(document.getElementById("projectArea").value);
  };

  const [architectData, setArchitectData] = useState([]);

  async function getArchitect() {
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
  }

  /* GET PROJECT DETAILS */
  async function getProjects() {
    const res = await fetch(`${api_url}/projects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setAllProjects(data);
  }

  /* ADD PROJECTS */
  async function addProject() {
    const res = await fetch(`${api_url}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dummy_token}`,
      },
      body: JSON.stringify({
        architect_id: archId,
        projectname: projectTile,
        location: projectLocation,
        projectarea: projectArea,
        Image: projectImages,
      }),
    });
    const data = await res.json();
    console.log(data);
    if ((data.status = 200)) {
      document.getElementById("loadernextClickProject").style.display = "none";
      document.getElementById("nextButtonProject").style.display = "block";
      setCount(count + 1);
      setProjectTitle("");
      setProjectLocation("");
      setProjectArea("");
      setProjectImages([]);
      setFiles([]);
      if (count === 3) {
        getArchitect();
        getProjects();
        document.getElementById("projectDetailsContainer").style.display = "none";
        document.getElementById("architectDetails").style.display = "block";
      }
    }
  }

  const projectNextClick = () => {
    if (projectTile !== "" && projectLocation !== "" && projectImages.length !== 0) {
      document.getElementById("errorProjectadd").style.display = "none";
      document.getElementById("loadernextClickProject").style.display = "block";
      document.getElementById("nextButtonProject").style.display = "none";
      addProject();
    } else {
      document.getElementById("errorProjectadd").style.display = "block";
      document.getElementById("errorProjectadd").style.color = "red";
    }
  };

  const viewAllArchs = () => {
    window.location.href = "/viewAllArchitects";
  };

  const viewAllusers = () => {
    window.location.href = "/admin-dashboard";
  };

  const projectView = (id) => {
    localStorage.setItem("projectIdImage", id);
    window.location.href = "/projectArchitect";
  };

  return (
    <div className={Archstyles.bodyRegister} style={{ backgroundImage: `url('/registerBg.jpg')` }}>
      {/* <div className={registerstyles.header__bodyRegister}>
        <div className={Headerstyles.header__left}>
          <Image
            className={Headerstyles.header__logo}
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={100}
          />
        </div>
        <div className={Archstyles.headerRightAdmin}>
          <div onClick={viewAllusers} className={Archstyles.UserList}>
            Users List
          </div>
          <div onClick={viewAllArchs} className={Archstyles.viewAll}>
            View All Architects
          </div>
        </div>
      </div> */}
      <HeaderDashboard />
      <div id="architectDetailsConatiner" className={Archstyles.architectDetailsConatiner}>
        <h2 className={Archstyles.fillData} style={{ color: "#ffffff" }}>
          Architect Details
        </h2>
        <div className={Archstyles.content__bodyRegister}>
          <div className={Archstyles.inputs__container__bodyRegister}>
            <form className={registerstyles.form} action="" autoComplete="off">
              <div
                className={editArch.profilePhoto}
                style={url !== "" ? { backgroundImage: `url(${url})`, marginBottom: "10px" } : { display: "none" }}
              ></div>
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
              <div
                className={editArch.coverPhoto}
                style={
                  urlCover !== ""
                    ? {
                        backgroundImage: `url(${urlCover})`,
                        marginBottom: "10px",
                      }
                    : { display: "none" }
                }
              ></div>
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
                  <input onChange={storeValues} id="fname" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Last Name</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} id="lname" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Email</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} id="email" type="email" />
                </div>
              </fieldset>
            </form>
          </div>
          <div className={registerstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <fieldset className={registerstyles.input__container}>
                <legend>Mobile number</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} id="phone" type="tel" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Location</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} id="location" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Website</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeValues} id="web" type="text" />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Bio</legend>
                <div className={Archstyles.textarea}>
                  <textarea onChange={storeValues} maxLength={250} id="bio" type="text" />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <p id="errorDetailsArch" className={Archstyles.error__varifyOtp}>
          Must fill all field
        </p>
        <div className={Archstyles.buttonContainer}>
          <div onClick={nextClick} id="nextClickArch" className={Archstyles.nextButtonArchitect}>
            <div className={registerstyles.loader__container__register} id="loadernextClickForm">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="nextButtonForm">NEXT</p>
          </div>
        </div>
      </div>
      <div id="projectDetailsContainer" className={Archstyles.projectDetailsContainer}>
        <h2 className={Archstyles.fillDataProject} style={{ color: "#ffffff" }}>
          Project Details
        </h2>
        <div className={Archstyles.content__bodyRegister}>
          <div className={Archstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <h4 style={{ color: "#ffffff" }}>Project {count}</h4>
              <fieldset className={registerstyles.input__container}>
                <legend>Project Images</legend>
                <div className={Archstyles.chooseImg}>
                  <input
                    id="inpFilePost"
                    type="file"
                    name="file"
                    accept="image/png, image/jpg, image/jpeg"
                    multiple
                    onChange={uploadMultipleFiles}
                  />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Project Title</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeProjectValues} id="projectTitle" type="text" value={projectTile} />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Project Location</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeProjectValues} id="projectLocation" type="text" value={projectLocation} />
                </div>
              </fieldset>
              <fieldset className={registerstyles.input__container}>
                <legend>Total Area(sq.ft)</legend>
                <div className={registerstyles.input__box}>
                  <input onChange={storeProjectValues} id="projectArea" type="text" value={projectArea} />
                </div>
              </fieldset>
              <p id="errorProjectadd" className={registerstyles.error__varifyOtp}>
                Must fill all field
              </p>
            </form>
          </div>
          <div className={registerstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <p id="progressProject" style={{ display: "none", marginBottom: "20px" }}>
                Image uploading...({percentProject}%)
              </p>
              <div className={Archstyles.imageProjectCardContainer}>
                {files.map((items, index) => {
                  return (
                    <div className={Archstyles.imageProject} style={{ backgroundImage: `url(${items})` }} key={index}>
                      <h2>{index + 1}</h2>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
        <div className={Archstyles.buttonContainer}>
          <div onClick={projectNextClick} id="nextClickArch" className={Archstyles.nextButtonArchitect}>
            <div className={registerstyles.loader__container__register} id="loadernextClickProject">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="nextButtonProject">NEXT</p>
          </div>
        </div>
      </div>
      <div className={styles.architectDetailsPage} id="architectDetails" style={{ backgroundColor: "#ffffff" }}>
        <div className={styles.profile__architect}>
          <div
            className={styles.avatar__architectDetailBg}
            style={{
              backgroundImage: `url(${architectData.profilepic})`,
            }}
          ></div>
          <div className={styles.right__conatiner__profile}>
            <div className={styles.top__right__conatiner__profile}>
              <div className={styles.top__top__right__conatiner__profile}>
                <div className={styles.name__top__right__conatiner__profile}>
                  <h3>
                    {architectData.firstname} {architectData.lastname}
                  </h3>
                  <div></div>
                </div>
                <h4></h4>
              </div>
            </div>
            <div className={styles.bottom__right__conatiner__profile}>
              <p>{architectData.bio}</p>
            </div>
            <div className={styles.contact__architect} style={{ marginTop: "20px" }}>
              <div className={styles.contactIcon__architect}>
                <Image src="/location.svg" alt="" width={20} height={20}></Image>
              </div>
              <div className={styles.contactText__architect}>
                <h5>Location</h5>
                <p>{architectData.location}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.projectContainer__architect}>
          <h3>Recent Projects</h3>
          <div className={styles.projectCardAdmin}>
            {allProjects.map((items, index) => {
              return (
                <div
                  onClick={() => projectView(items._id)}
                  key={index}
                  style={{
                    backgroundImage: `url(${items.Image[0]})`,
                  }}
                  className={styles.projectCard__architect__admin}
                >
                  <div>
                    <h4>{items.projectname}</h4>
                    <p>
                      {items.location} | {items.projectarea} sq.ft
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAddArchitect;
