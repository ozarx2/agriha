import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/ViewProjectArch.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import Archstyles from "../styles/BodyAddArchitect.module.css";
import registerstyles from "../styles/BodyRegister.module.css";
import { PulseLoader } from "react-spinners";
import api_url from "../src/utils/url";

const ProjectArchitectAdmin = () => {
  const [project, setProject] = useState([]);
  const [projectImg, setProjectImg] = useState([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectArea, setProjectArea] = useState("");

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var projectId = localStorage.getItem("projectIdImage");
    const res = await fetch(
      `${api_url}/projects/arcprojectsingle/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
        },
      }
    );

    const data = await res.json();
    console.log(data[0]);
    setProject(data[0]);
    setProjectImg(data[0].Image);
    setProjectTitle(data[0].projectname);
    setProjectLocation(data[0].location);
    setProjectArea(data[0].projectarea);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const imageview = (url) => {
    document.getElementById("viewProjectArch").style.display = "none";
    document.getElementById("imageGallery").style.display = "block";
  };

  const closeClick = () => {
    document.getElementById("imageGallery").style.display = "none";
    document.getElementById("viewProjectArch").style.display = "flex";
  };

  const slideref = useRef();

  if (typeof window !== "undefined") {
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          slideref.current.goBack();
          break;
        case 39:
          slideref.current.goNext();
          break;
      }
    };
  }

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
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

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

  const storeProjectValues = () => {
    setProjectTitle(document.getElementById("projectTitle").value);
    setProjectLocation(document.getElementById("projectLocation").value);
    setProjectArea(document.getElementById("projectArea").value);
  };

  const editProject = () => {
    document.getElementById("viewProjectArch").style.display = "none";
    document.getElementById("editProjectContainer").style.display = "flex";
  };

  /* UPDATE PROJECTS */
  async function updateProject() {
    document.getElementById("loadernextClickProject").style.display = "block";
    document.getElementById("nextClickArch").style.display = "none";

    var projectId = localStorage.getItem("projectIdImage");

    const res = await fetch(`${api_url}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
      },
      body: JSON.stringify({
        projectname: projectTitle,
        location: projectLocation,
        projectarea: projectArea,
        Image: projectImg,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      window.location.reload();
    }
  }

  return (
    <div>
      <div className={styles.viewProjectArch} id="viewProjectArch">
        <div className={styles.titleContainer__viewProjectArch}>
          <div className={styles.title__viewProjectArch}>
            <h3>{project.projectname}</h3>
            <h4>{project.location}</h4>
            <h5>{project?.projectarea} sq.ft</h5>
          </div>
          <div onClick={editProject} className={styles.editProject}>
            Edit Project
          </div>
        </div>
        <div className={styles.content__viewProjectArch}>
          {projectImg?.map((items, index) => {
            return (
              <div
                onClick={() => imageview(items)}
                key={index}
                className={styles.image__project__viewProjectArch}
                style={{ backgroundImage: `url(${items})` }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className={styles.editProjectContainer} id="editProjectContainer">
        <div className={Archstyles.content__bodyRegister}>
          <div className={Archstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <h3 style={{ marginBottom: "30px" }}>Edit Project Details</h3>
              {/* <fieldset className={styles.input__container}>
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
              </fieldset> */}
              <fieldset className={styles.input__container}>
                <legend>Project Title</legend>
                <div className={styles.input__box}>
                  <input
                    onChange={storeProjectValues}
                    id="projectTitle"
                    type="text"
                    defaultValue={projectTitle}
                  />
                </div>
              </fieldset>
              <fieldset className={styles.input__container}>
                <legend>Project Location</legend>
                <div className={styles.input__box}>
                  <input
                    onChange={storeProjectValues}
                    id="projectLocation"
                    type="text"
                    defaultValue={projectLocation}
                  />
                </div>
              </fieldset>
              <fieldset className={styles.input__container}>
                <legend>Total Area(sq.ft)</legend>
                <div className={styles.input__box}>
                  <input
                    onChange={storeProjectValues}
                    id="projectArea"
                    type="text"
                    defaultValue={projectArea}
                  />
                </div>
              </fieldset>
            </form>
            <div
              onClick={updateProject}
              className={Archstyles.nextButtonArchitect}
            >
              <div
                className={registerstyles.loader__container__register}
                id="loadernextClickProject"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="nextClickArch">NEXT</p>
            </div>
          </div>
          <div className={registerstyles.inputs__container__bodyRegister}>
            <form autoComplete="off" className={registerstyles.form} action="">
              <p
                id="progressProject"
                style={{ display: "none", marginBottom: "20px" }}
              >
                Image uploading...({percentProject}%)
              </p>
              <div className={Archstyles.imageProjectCardContainer}>
                {files.map((items, index) => {
                  return (
                    <div
                      className={Archstyles.imageProject}
                      style={{ backgroundImage: `url(${items})` }}
                      key={index}
                    >
                      <h2>{index + 1}</h2>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.imageGallery} id="imageGallery">
        <Slide ref={slideref}>
          {projectImg.map((items, index) => {
            return (
              <div key={index} className={styles.each_slide_effect}>
                <div style={{ backgroundImage: `url(${items})` }}>
                  <div
                    onClick={closeClick}
                    className={styles.closeButtonContainer}
                  >
                    <Image
                      src="/close.svg"
                      alt=""
                      width={30}
                      height={30}
                    ></Image>
                  </div>
                </div>
              </div>
            );
          })}
        </Slide>
      </div>
    </div>
  );
};

export default ProjectArchitectAdmin;
