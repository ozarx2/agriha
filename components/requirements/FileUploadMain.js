/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { StoreContext } from "../StoreContext";
import { PulseLoader } from "react-spinners";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import api_url from "../../src/utils/url";
var randomstring = require("randomstring");

import styles from "./RequirementsMain.module.css";

const FileUploadMain = () => {
  const router = useRouter();

  const [sitePlanDetails, setSitePlanDetails] = useState([]);
  const [referanceImageDetails, setReferanceImageDetails] = useState([]);
  const [thumbnailDetails, setThumbnailDetails] = useState([]);

  const [sitePlanLoading, setSitePlanLoading] = useState(false);
  const [referaceLoading, setReferaceLoading] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [Store] = useContext(StoreContext);

  const setRequirementPopup = Store.setRequirementPopup;
  const setBid = Store.setBid;
  const bidArchitectId = Store.bidArchitectId;
  const bid = Store.bid;

  const getSitePlan = (e) => {
    setSitePlanDetails(e.target.files[0]);
    handleUploadSitePLan(e.target.files[0]);
  };

  const getReferanceImages = (e) => {
    if (e.target.files.length <= 3) {
      console.log("set");
      setReferanceImageDetails(e.target.files);
      uploadReferanceImages(e.target.files);
    } else {
      alert("cant upload more than 3 pictures");
    }
  };

  const getThumbnail = (e) => {
    setThumbnailDetails(e.target.files[0]);
    handleUploadThumb(e.target.files[0]);
  };

  /* SITEPLAN UPLOADING */
  const [percent, setPercent] = useState(0);
  const [sitePlan, setSitePlan] = useState("");

  const handleSubmitSiteplan = (file) => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          site_plan: file,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setSitePlanLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleUploadSitePLan(img) {
    setSitePlanLoading(true);
    if (!img) {
      alert("Please choose a file first!");
    }

    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const storageRef = ref(
      storage,
      `/files/siteplan/${randomString}${img.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const us = url.split("/files")[1].split("?")[0].split("%2F")[2];
          const substr = us.substring(us.lastIndexOf("."));
          const replaceurl = url.replace(substr, "_400x400.webp");
          console.log("url", replaceurl);
          setSitePlan(replaceurl);
          handleSubmitSiteplan(replaceurl);
        });
      }
    );
  }

  /* REFERANCE IMAGES UPLOADING */
  const [projectImages, setProjectImages] = useState([]);
  const [percentProject, setPercentProject] = useState(0);

  const handleSubmitRefImages = () => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          reference_images: projectImages,
        },
        config
      )
      .then((response) => {
        // console.log(response.data);
        // console.log("refrerance uploaded");
        setReferaceLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addImages = (image) => {
    setProjectImages((projectImages) => [...projectImages, image]);
  };

  function handleUploadReferanceImages(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const storageRef = ref(
      storage,
      `/files/referanceImages/${randomString}${img.name}`
    );
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
          console.log("oldurl", url);
          const us = url.split("/files")[1].split("?")[0].split("%2F")[2];
          const substr = us.substring(us.lastIndexOf("."));
          const replaceurl = url.replace(substr, "_400x400.webp");
          console.log("newurl", replaceurl);
          addImages(replaceurl);
        });
      }
    );
  }

  const [files, setFiles] = useState([]);

  var fileObj = [];
  var fileArray = [];

  const uploadReferanceImages = (data) => {
    setReferaceLoading(true);
    fileObj.push(data);
    for (let i = 0; i < fileObj[0].length; i++) {
      handleUploadReferanceImages(fileObj[0][i]);
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFiles(fileArray);
  };

  useEffect(() => {
    if (files.length === projectImages.length) {
      handleSubmitRefImages();
    }
  }, [files, projectImages]);

  /* THUMBNAIL UPLOADING */
  const [percentThumb, setPercentThumb] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmitThumbnail = (file) => {
    const token = localStorage.getItem("userToken");
    const projectID = localStorage.getItem("projectId");

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `${api_url}/projects/update/${projectID}`,
        {
          thumbnail: file,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setThumbnailLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleUploadThumb(img) {
    setThumbnailLoading(true);
    if (!img) {
      alert("Please choose a file first!");
    }

    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const storageRef = ref(
      storage,
      `/files/project/${randomString}${img.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercentThumb(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("oldurl", url);
          const us = url.split("/files")[1].split("?")[0].split("%2F")[2];
          const substr = us.substring(us.lastIndexOf("."));
          const replaceurl = url.replace(substr, "_400x400.webp");
          console.log("newurl", replaceurl);
          setThumbnail(replaceurl);
          handleSubmitThumbnail(replaceurl);
        });
      }
    );
  }

  const goToUserDash = () => {
    if (bidArchitectId !== null) {
      setBid(false);
    }
    setRequirementPopup(true);
  };

  const viewSitePlan = () => {
    router.push(sitePlan);
  };

  // console.log(bidArchitectId);
  // console.log(bid);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.top__main_inner}>
            <div className={styles.left__main_inner}>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>1</span>
                  <p>Basic Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>2</span>
                  <p>Secondary Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>3</span>
                  <p>Choose Plan</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>File Upload</p>
              <div className={styles.inputRow_container_fileUpload}>
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    <input
                      type="file"
                      onChange={getSitePlan}
                      accept="application/pdf"
                      id="siteplan"
                    />
                    <div className={styles.inputRef}>Choose file</div>
                    {sitePlanLoading ? (
                      <PulseLoader color="#642dda" size={10} />
                    ) : (
                      <p>Upload Site Plan</p>
                    )}
                  </div>
                </div>
                {sitePlan !== "" ? (
                  <div className={styles.uploded_pdf}>
                    <img
                      src="/img/architect-dashboard/pdf.svg"
                      alt="uploaded pdf"
                      onClick={viewSitePlan}
                    />
                    <div>
                      <div>
                        {sitePlanDetails?.name
                          ? `Selected Filename : ${sitePlanDetails?.name}`
                          : ""}
                      </div>
                      <div>
                        Size : {(sitePlanDetails?.size / 1024).toFixed(2)} KB
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    {referanceImageDetails.length === 0 ? (
                      <input
                        id="referanceImg"
                        type="file"
                        multiple
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={getReferanceImages}
                      />
                    ) : (
                      <input type="file" disabled />
                    )}

                    <div className={styles.inputRef}>Choose files</div>
                    {referaceLoading ? (
                      <PulseLoader color="#642dda" size={10} />
                    ) : (
                      <p>Upload referance images(3)</p>
                    )}
                  </div>
                </div>
                {projectImages !== [] ? (
                  <div className={styles.uploded_refer_img}>
                    {projectImages.map((item, index) => {
                      return (
                        <img
                          key={index}
                          src={item}
                          alt="refrerance image"
                          onError={(e) => (e.target.src = item)}
                          onClick={() => {
                            router.push(item);
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.inputRow_fileUpload}>
                  <div className={styles.left_inputRow_fileUpload}>
                    <input
                      id="thumbnailImg"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={getThumbnail}
                    />
                    <div className={styles.inputRef}>Choose file</div>
                    {thumbnailLoading ? (
                      <PulseLoader color="#642dda" size={10} />
                    ) : (
                      <p>Upload Thumbnail Image</p>
                    )}
                  </div>
                </div>
                {thumbnail !== "" ? (
                  <div className={styles.uploded_refer_img}>
                    <img
                      src={thumbnail}
                      alt="thumbanail image"
                      // onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                      onError={(e) => (e.target.src = thumbnail)}
                      onClick={() => {
                        router.push(thumbnail);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <Link href="/">
              <div className={styles.contactUs_button}>Cancel</div>
            </Link>
            <div className={styles.save_button} onClick={goToUserDash}>
              {isLoading ? <PulseLoader color="#ffffff" /> : "Send Requirement"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadMain;
