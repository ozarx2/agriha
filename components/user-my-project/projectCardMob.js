/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import styles from "./main.module.css";
import FnFileUploadMob from "./fileuploadmob";
import FnFileFromArchMob from "./filefromarchmob";
import { useEffect } from "react";
import api_url from "../../src/utils/url";
import endpoint from "../../src/utils/endpoint";
import FnfolderMob from "./folderMob";
import FnFolderMob from "./folderMob";

const FnprojectCardMob = ({ index, name, place, budget, area, bid, id, architectId, status, startDate, thumbnail }) => {
  const [files, setFiles] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [sentFile, setSentFile] = useState(false);
  const [suggestProd, setsuggestProd] = useState(false);
  const [descriptionMob, setDescriptionMob] = useState("");
  const [mainViewMore, setMainViewMore] = useState("");
  const [fileViewMore, setfileViewMore] = useState("");
  const [fileToArchitect, setFileToArchitect] = useState("");
  const [sugProd, setSugProd] = useState("");
  const [sliced, setSliced] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [fileData, setFileData] = useState(false);
  const [fileFromArch, setfileFromArch] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const toggleFileDataMob = (projectId) => {
    setFileData((prevState) => !prevState);
    setfileFromArch(projectId);
  };

  const handlerMob = (e) => {
    setDescriptionMob(e.target.value);
  };

  const toggleBtnMob = (id) => {
    setViewMore((prevState) => !prevState);
    setMainViewMore(id);
  };

  const toggleSentFileMob = (id) => {
    setSentFile((prevState) => !prevState);
    setFileToArchitect(id);
  };
  const toggleSuggProdMob = (id) => {
    setsuggestProd((prevState) => !prevState);
    setSugProd(id);
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

  const singleDeleteImage = (i) => {
    let temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  async function getUploadFile() {
    const token = localStorage.getItem("userToken");
    const response = await fetch(`${api_url}/fileupload/userfiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      setUploadedFiles(data?.userFile);
    }
  }

  async function getUploadedFiles() {
    const response = await fetch(`${endpoint}/fileupload/uploaded_file/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    var documentsForProject = data.data?.filter((res) => res.project_id === id);
    setDocuments(documentsForProject);
    setSliced(documentsForProject?.slice(0, 3));
  }

  // useEffect(() => {
  //   getUploadFile();
  // }, []);

  async function getUploadedFiles() {
    const response = await fetch(`${endpoint}/fileupload/uploaded_file/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    var documentsForProject = data.data?.filter((res) => res.project_id === id);
    setDocuments(documentsForProject);
    setSliced(documentsForProject?.slice(0, 3));
  }
  useEffect(() => {
    getUploadFile();
    getUploadedFiles();
  }, []);

  const viewAllClick = () => {
    if (!viewAll) {
      setViewAll(true);
    } else {
      setViewAll(false);
    }
  };

  useEffect(() => {
    if (viewAll) {
      setSliced(documents);
    } else {
      setSliced(documents?.slice(0, 3));
    }
  }, [viewAll]);

  useEffect(() => {
    async function suggestedData() {
      const response = await fetch("https://ecommnerc-test.onrender.com/product");
      const data = await response.json();
      setSuggestion(data);
      console.log(data);
    }
    suggestedData();
  }, []);

  return (
    <div>
      <div className={styles.projImgMobMainSec}>
        <div className={styles.projImgMobMian}>
          <img
            src={thumbnail ? thumbnail : "/img/landing/nophoto.jpg"}
            onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
            alt="projmob.svg"
            className={styles.projmob}
          />

          <div className={styles.projImgProNamePicMobMainSec}>
            <div className={styles.projImgProNamePicMobMain}>
              <div>
                <div className={styles.projNameMob}>Project {index + 1}</div>
                <div className={styles.projIdMob}>{name}</div>
              </div>
              <div className={styles.projProPicBtnsMob}>
                {architectId ? (
                  <Link href={`/user-architect-about/${architectId?._id}`} passHref>
                    <img
                      src={
                        architectId?.profilepic
                          ? architectId?.profilepic
                          : "/img/my-project-user/mobile/projprofile.svg"
                      }
                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                      alt="propic.jpg"
                      className={styles.propicDp}
                    />
                  </Link>
                ) : (
                  ""
                )}

                <div className={styles.viewMoreMob} onClick={() => toggleBtnMob(id)}>
                  {viewMore && mainViewMore === id ? "View Less" : "View More"}
                  <span>
                    {viewMore && mainViewMore === id ? (
                      <img src="/img/my-project-user/mobile/showlessmob.svg" alt="down.svg" />
                    ) : (
                      <img src="/img/my-project-user/mobile/showmoremob.svg" alt="up.svg" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {viewMore && mainViewMore === id ? (
          ""
        ) : (
          <div className={styles.productsMobSecMain}>
            <div className={styles.productsMobSec}>
              <div className={styles.productsMobSecHead}>Products</div>
              <div>
                <img src="/img/my-project-user/mobile/prodmob.svg" alt="prodmob.svg" className={styles.prodmob} />
                <img src="/img/my-project-user/mobile/prodmob2.svg" alt="prodmob.svg" className={styles.prodmob} />
                <img src="/img/my-project-user/mobile/prodmob3.svg" alt="prodmob.svg" className={styles.prodmob} />
                <img src="/img/my-project-user/mobile/prodmob4.svg" alt="prodmob.svg" className={styles.prodmob} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className={styles.projStatusMainSecMob}>
        <div className={styles.projStatusLeftMainMob}>
          <div className={styles.profileStatusMob}>Status</div>
          <div className={styles.profileStatusMob}>Started on</div>
          <div className={styles.profileStatusMob}>Place</div>
          <div className={styles.profileStatusMob}>Budget</div>
          <div className={styles.profileStatusMob}>Area</div>
          <div className={styles.profileStatusMob}>Payment status</div>

          {bid ? <div className={styles.profileStatusMob}>Bid</div> : ""}
        </div>
        <div className={styles.projStatusRightMainMob}>
          <div className={styles.profileStatusMob}>: {status}</div>
          <div className={styles.profileStatusMob}>: {startDate}</div>
          <div className={styles.profileStatusMob}>: {place}</div>
          <div className={styles.profileStatusMob}>: {budget}</div>
          <div className={styles.profileStatusMob}>: {area}</div>
          <div className={styles.profileStatusMob}>: Pending</div>

          {bid ? <div className={styles.profileStatusMob}>: Active</div> : ""}
        </div>
      </div> */}
      <table className={styles.table_out}>
        <tbody>
          <tr>
            <td>Status</td>
            <td className={styles.tableDataResult}>: {status}</td>
          </tr>
          <tr>
            <td>Started on</td>
            <td className={styles.tableDataResult}>: {startDate}</td>
          </tr>
          <tr>
            <td>Place</td>
            <td className={styles.tableDataResult}>: {place}</td>
          </tr>
          <tr>
            <td>Budget</td>
            <td className={styles.tableDataResult}>: {budget}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td className={styles.tableDataResult}>: {area}</td>
          </tr>
          <tr>
            <td>Payment status</td>
            <td className={styles.tableDataResult}>: Pending</td>
          </tr>
          <tr>
            {bid ? <td>Bid</td> : ""}
            {bid ? <td className={styles.tableDataResult}>: Active</td> : ""}
          </tr>
        </tbody>
      </table>

      {viewMore && mainViewMore === id ? (
        <>
          <div className={styles.suggestedProductsMainSecMob}>
            <div className={styles.suggestedProductsMainMob}>
              <div className={styles.suggestedProductHead}>Suggested Products</div>
              <div className={styles.suggProdListMob}>3 Products list</div>
            </div>
          </div>
          <div className={styles.suggestedBedProductsMainSecMob}>
            <div className={styles.suggestedBedProductsMainMob}>
              <div className={styles.suggestedBedProductHead} onClick={() => toggleSuggProdMob(id)}>
                05 Hall Products
              </div>
              <div className={styles.suggProdListMob} onClick={() => toggleSuggProdMob(id)}>
                {suggestProd && sugProd === id ? (
                  <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                ) : (
                  <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                )}
              </div>
            </div>
            {suggestProd ? (
              <div className={styles.bedProdMobMainSec}>
                {suggestion?.map((sugg, index) => {
                  return (
                    <>
                      <div className={styles.coloumn}>
                        <img src={sugg?.thumbnail} alt="bedprodmob.svg" />
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.suggestedKitchenProductsMainSecMob}>
            <div className={styles.suggestedKitechenProductsMainMob}>
              <div className={styles.suggestedKitchenProductHead}>00 Kitchen Products</div>
              <div className={styles.suggKitchenListMob}>
                <img src="/img/my-project-user/mobile/downmob.svg" alt="upmob.svg" />
              </div>
            </div>
          </div>
          <div className={styles.suggestedHallProductsMainSecMob}>
            <div className={styles.suggestedHallProductsMainMob}>
              <div className={styles.suggestedHallProductHead}>00 Bedroom Products</div>
              <div className={styles.suggHallListMob}>
                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
              </div>
            </div>
          </div>
          <div className={styles.fileUploadSecMainMob}>
            <FnFolderMob documents={documents} projectId={id} />
          </div>
          <div className={styles.sentFileMainSecMob}>
            <div className={styles.sentFileMainMob}>
              <div className={styles.sentFileHead} onClick={() => toggleSentFileMob(id)}>
                Send file to architect
              </div>
              <div className={styles.sentFileListMob} onClick={() => toggleSentFileMob(id)}>
                {sentFile && fileToArchitect === id ? (
                  <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                ) : (
                  <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                )}
              </div>
            </div>
            {sentFile ? (
              <div className={styles.sentFileUploadMainSecMob}>
                <FnFileUploadMob projectId={id} allUploadedFiles={uploadedFiles} />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.fileFromMainMob}>
            <div className={styles.fileFromHead} onClick={() => toggleFileDataMob(id)}>
              File from architect
            </div>
            <div className={styles.fileFromListMob} onClick={() => toggleFileDataMob(id)}>
              {fileData && fileFromArch === id ? (
                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
              ) : (
                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
              )}
            </div>
          </div>
          {fileData ? (
            <div className={styles.fileFromMainSecMob}>
              <FnFileFromArchMob projectId={id} sliced={sliced} />
            </div>
          ) : (
            ""
          )}
        </>
      ) : null}
    </div>
  );
};

export default FnprojectCardMob;
