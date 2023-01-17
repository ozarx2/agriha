/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import api_url from "../../src/utils/url";

import styles from "./addproject.module.css";

const AddProject = () => {
  const [Store] = useContext(StoreContext);

  const setAddProject = Store.setAddProject;
  const setAddProjectImagePopup = Store.setAddProjectImagePopup;
  const architectId = Store.architectId;
  const files = Store.files;
  const setFiles = Store.setFiles;

  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);

  /* Upload thumb images */
  const [percent, setPercent] = useState(0);
  const [thumb, setThumb] = useState("");

  function handleUploadThumb(img) {
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/thumb/${img.name}`);
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
          setThumb(url);
        });
      }
    );
  }

  const uploadThumbFiles = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUploadThumb(event.target.files[0]);
    }
  };

  /* Upload project images */
  const [projectImages, setProjectImages] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

  function handleUploadProject(img) {
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
          console.log(url);
          addImages(url);
        });
      }
    );
  }

  /* Multiple Image Uploading */
  var fileObj = [];
  var fileArray = [];

  const uploadMultipleFiles = (e) => {
    if (e.target.files.length <= 30) {
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
        setFiles((files) => [...files, { url: URL.createObjectURL(fileObj[0][i]), file: fileObj[0][i] }]);
      }
    } else {
      alert("Cannot add more than 30 pictures");
    }
  };

  const uploadProject = () => {
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      handleUploadProject(temp[i].file);
    }
  };

  /* ADD PROJECTS */
  const [projectTile, setProjectTitle] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [projectType, setProjectType] = useState("Residential");
  const [projectTag, setProjectTag] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const storeProjectValues = () => {
    setProjectTitle(document.getElementById("projectTitle").value);
    setProjectLocation(document.getElementById("projectLocation").value);
    setProjectArea(document.getElementById("projectArea").value);
    setProjectTag(document.getElementById("hashtag").value);
    setProjectDescription(document.getElementById("projectDescription").value);
  };

  const chooseProjectType = (e) => {
    console.log(e.target.value);
    setProjectType(e.target.value);
  };

  // console.log(projectType);

  async function addProject() {
    var token = localStorage.getItem("architectToken");

    if (projectTile !== "" && projectLocation !== "" && projectArea !== "" && projectImages !== [] && thumb !== "") {
      const res = await fetch(`${api_url}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          architect_id: architectId,
          projectname: projectTile,
          location: projectLocation,
          projectarea: projectArea,
          Image: projectImages,
          thumbnail: thumb,
          project_type: projectType,
          description: projectDescription,
          hashtag: projectTag,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 200) {
        setLoading(false);
        window.location.reload();
      }
    } else {
      alert("please fill all fields");
    }
  }

  const uploadClick = () => {
    setLoading(true);
    uploadProject();
  };

  useEffect(() => {
    if (
      files.length === projectImages.length &&
      files.length !== 0 &&
      projectImages.length !== 0 &&
      projectType !== ""
    ) {
      addProject();
    }
  }, [projectImages]);

  async function getProjects() {
    const token = localStorage.getItem("architectToken");
    const res = await fetch(`${api_url}/project-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProjectTypes(data.projecttype);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.addProjectOuter}>
      <div className={styles.addProject}>
        <div className={styles.heading}>
          <div>Add new project</div>
          <img onClick={() => setAddProject(false)} src="/img/architect-dashboard/modal/close.svg" alt="close.svg" />
        </div>
        <div className={styles.content}>
          <p>To add projects, all you need is images, title, location and area.</p>
          <div key="title" className={styles.feild}>
            <div className={styles.title}>
              Project title<span>*</span>
            </div>
            <input id="projectTitle" type="text" placeholder="Enter project title" onChange={storeProjectValues} />
          </div>
          <div key="type" className={styles.feild}>
            <div className={styles.title}>
              Project Type<span>*</span>
            </div>
            <select onChange={chooseProjectType}>
              {projectTypes?.map((project, index) => {
                return (
                  <option key={index} value={project.project_type}>
                    {project.project_type}
                  </option>
                );
              })}
            </select>
          </div>
          <div key="location" className={styles.feild}>
            <div className={styles.title}>
              Location<span>*</span>
            </div>
            <input
              id="projectLocation"
              type="text"
              placeholder="Enter project location"
              onChange={storeProjectValues}
            />
          </div>
          <div key="area" className={styles.feild}>
            <div className={styles.title}>
              Total area<span>*</span>
            </div>
            <input id="projectArea" type="text" placeholder="Enter area in Sqft" onChange={storeProjectValues} />
          </div>
          <div key="hashtag" className={styles.feild}>
            <div className={styles.title}>
              Hashtag<span>*</span>
            </div>
            <input id="hashtag" type="text" placeholder="Enter hashtag" onChange={storeProjectValues} />
          </div>
          <div key="description" className={styles.feild}>
            <div className={styles.title}>
              Description<span>*</span>
            </div>
            <textarea id="projectDescription" type="text" placeholder="Description" onChange={storeProjectValues} />
          </div>
          <div key="thumbnail" className={styles.feild}>
            <div className={styles.title}>
              Thumbnail<span>*</span>
            </div>
            <input
              className={styles.custom_file_input}
              type="file"
              placeholder="No file selected"
              accept="image/png, image/jpg, image/jpeg"
              onChange={uploadThumbFiles}
            />
          </div>
          <div key="multiple_img" className={styles.feild}>
            <div className={`${styles.title} ${styles.add_img_title}`}>
              <div>
                Add more pictures<span>*</span>
              </div>
            </div>
            <div
              className={`add_project_multiple_img_outer ${styles.add_project_multiple_img_outer} ${styles.add_project_popup_multiple_img_outer}`}
            >
              <div className={styles.mu_all_img_out}>
                <div className={styles.mu_upload_out}>
                  <img src="/img/architect-dashboard/add_images.svg" alt="add_images.svg" />
                  <input
                    className={styles.custom_file_input}
                    type="file"
                    multiple
                    onChange={uploadMultipleFiles}
                    placeholder="No file selected"
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </div>
                <div className={styles.mu_img_out}>
                  {files?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        onClick={() => setAddProjectImagePopup(true)}
                        className={styles.imgDemo}
                        src={item.url}
                        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                      />
                    );
                  })}
                  {files?.length > 4 ? (
                    <div key="more" onClick={() => setAddProjectImagePopup(true)} className={styles.plus_more}>
                      +{files?.length - 4} more
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <button className={styles.cancel} onClick={() => setAddProject(false)}>
            Cancel
          </button>
          <button className={styles.upload} onClick={() => uploadClick()}>
            {loading ? (
              <PulseLoader color="#ffffff" />
            ) : (
              <>
                <img src="/img/architect-dashboard/upload-cloud.svg" alt="upload" />
                <span>Upload project</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div onClick={() => setAddProject(false)} className={styles.addProjectClose}></div>
    </div>
  );
};

export default AddProject;
