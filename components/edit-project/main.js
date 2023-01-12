import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api_url from "../../src/utils/url";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import styles from "./main.module.css";

export default function EditProjectMain() {
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  const [thumbnail, setThumbnail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [description, setDescription] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [projectImages, setProjectImages] = useState([]);

  const [tembImages, setTembImages] = useState([]);
  const [tembCount, setTembCount] = useState(0);

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data[0]);
    setThumbnail(data[0]?.thumbnail);
    setProjectName(data[0]?.projectname);
    setProjectType(data[0]?.project_type);
    setLocation(data[0]?.location);
    setProjectArea(data[0]?.projectarea);
    setHashtag(data[0]?.hashtag);
    setDescription(data[0]?.description);
    setProjectImages(data[0]?.Image);
  }

  useEffect(() => {
    if (projectId !== "") {
      getProjects();
    }
  }, [projectId]);

  async function editProjectArchitect() {
    console.log(projectImages);
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectname: projectName,
        location: location,
        projectarea: projectArea,
        project_type: projectType,
        description: description,
        hashtag: hashtag,
        Image: projectImages,
        thumbnail: thumbnail,
      }),
    });

    const data = await res.json();
    console.log(data);
    /* if (data) {
      window.history.back();
    } */
  }

  /* Upload thumb images */
  const [percent, setPercent] = useState(0);

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
          setThumbnail(url);
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

  const [percentProject, setPercentProject] = useState(0);

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
    setTembImages((tembImages) => [...tembImages, image]);
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
          setFiles([]);
        });
      }
    );
  }

  /* Multiple Image Uploading */
  var fileObj = [];
  var fileArray = [];
  const [files, setFiles] = useState([]);

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
    setTembCount(files.length);
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      handleUploadProject(temp[i].file);
    }
  };

  const saveProject = () => {
    uploadProject();
  };

  console.log(tembCount);

  useEffect(() => {
    if (tembCount !== 0 && tembImages.length === tembCount) {
      editProjectArchitect();
    }
  }, [tembImages, tembCount]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.editProjectMain}>
            <div className={styles.title_editProjectMain}>
              <h3>Edit Project</h3>
              <h4>Customize your Project details</h4>
            </div>
            <div className={styles.details_editProjectMain}>
              <div className={styles.thumbnail_editProjectMain}>
                <p>Thumbnail</p>
                <img
                  src={thumbnail ? thumbnail : "/img/architect-dashboard/noImg.jpeg"}
                  onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                  alt="thumbnail"
                />
                <input
                  className={styles.thumbnailInput}
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={uploadThumbFiles}
                />
                <div className={styles.editThumbnail_editProjectMain}>
                  <FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
                  edit
                </div>
              </div>
              <div className={styles.inputContainer_editProjectMain}>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Project Title</p>
                  <input type="text" readOnly value={projectName} />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Project type</p>
                  <input type="text" onChange={(e) => setProjectType(e.target.value)} defaultValue={projectType} />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Location</p>
                  <input type="text" onChange={(e) => setLocation(e.target.value)} defaultValue={location} />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Total area</p>
                  <input type="text" onChange={(e) => setProjectArea(e.target.value)} defaultValue={projectArea} />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Hashtag</p>
                  <input type="text" defaultValue={hashtag} readOnly />
                </div>
                <div className={styles.inputBox_editProjectMain}>
                  <p>Description</p>
                  <input type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
                </div>
              </div>
              <div className={styles.imageConatiner_editProjectMain}>
                {projectImages?.map((item, index) => {
                  return (
                    <div key={index} className={styles.imageBox_editProjectMain}>
                      <div className={styles.deleteImage_editProjectMain}>
                        <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                        Delete
                      </div>
                      <img src={item} alt="image_project" />
                    </div>
                  );
                })}
                <div className={styles.addNewImage_container}>
                  <div className={styles.addNew_image}>
                    <img src="/img/architect-dashboard/add_images.svg" alt="add_images.svg" />
                    <input
                      className={styles.addNewImage_input}
                      type="file"
                      multiple
                      onChange={uploadMultipleFiles}
                      placeholder="No file selected"
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.imageConatiner_editProjectMain}>
                {files?.map((item, index) => {
                  return (
                    <div key={index} className={styles.imageBox_editProjectMain}>
                      <img src={item.url} alt="image_project" />
                    </div>
                  );
                })}
              </div>

              <div className={styles.updateButtonContainer}>
                <div className={styles.updateButton} onClick={saveProject}>
                  Save Project
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
