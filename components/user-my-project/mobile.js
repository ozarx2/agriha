/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StoreContext } from "../../components/StoreContext";
import storage from "../../firebase";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

import styles from "./main.module.css";
import FnFileUploadMob from "./fileuploadmob";
import FnFileFromArchMob from "./filefromarchmob";

const FnUserMyProjectMobile = () => {
  const [Store] = useContext(StoreContext);
  // const files = Store.files;
  // const setFiles = Store.setFiles;

  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [viewFileMore, setViewFileMore] = useState(false);
  const [sentFile, setSentFile] = useState(false);
  const [suggestProd, setsuggestProd] = useState(false);
  const [descriptionMob, setDescriptionMob] = useState("");
  const [mainViewMore, setMainViewMore] = useState("");
  const [fileViewMore, setfileViewMore] = useState("");
  const [fileToArchitect, setFileToArchitect] = useState("");
  const [sugProd, setSugProd] = useState("");
  const [projectMob, setProjectMob] = useState([]);

  const handlerMob = (e) => {
    setDescriptionMob(e.target.value);
  };

  const toggleBtnMob = (id) => {
    setViewMore((prevState) => !prevState);
    setMainViewMore(id);
  };
  const toggleFileBtnMob = (id) => {
    setViewFileMore((prevState) => !prevState);
    setfileViewMore(id);
  };
  const toggleSentFileMob = (id) => {
    setSentFile((prevState) => !prevState);
    setFileToArchitect(id);
  };
  const toggleSuggProdMob = (id) => {
    setsuggestProd((prevState) => !prevState);
    setSugProd(id);
  };
  async function getProjectMob() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`https://agriha-server-dot-agriha-services.uc.r.appspot.com/projects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setProjectMob(data?.projects);
  }

  useEffect(() => {
    getProjectMob();
  }, []);

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

  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.projMobSecMain}>
              <div className={styles.projBtnsMob}>
                {/* <div className={styles.projBackOne}>
                            {viewMore ? (
                              <img
                                src="/img/my-project-user/mobile/leftmob.svg"
                                alt="leftmob.svg"
                              />
                            ) : (
                              ""
                            )}
                          </div> */}
                <div className={styles.projBtnsOne}>Ongoing Projects</div>
                <div className={styles.projBtnsTwo}>Projects History</div>
              </div>
              {projectMob?.map((items, key) => {
                return (
                  <>
                    <div className={styles.projImgMobMainSec}>
                      <div className={styles.projImgMobMian}>
                        <img
                          src="/img/my-project-user/mobile/projmob.svg"
                          alt="projmob.svg"
                          className={styles.projmob}
                        />

                        <div className={styles.projImgProNamePicMobMainSec}>
                          <div className={styles.projImgProNamePicMobMain}>
                            <div>
                              <div className={styles.projNameMob}>Project name</div>
                              <div className={styles.projIdMob}>{items?.project_name}</div>
                            </div>
                            <div className={styles.projProPicBtnsMob}>
                              <Link href={`/user-architect-about/${items?.architect_id?._id}`} passHref>
                                <img
                                  src={items?.architect_id?.profilepic}
                                  // src="/img/my-project-user/mobile/projprofile.svg"
                                  alt="projprofile.svg"
                                  className={styles.projprofileMob}
                                />
                              </Link>
                              <div className={styles.viewMoreMob} onClick={() => toggleBtnMob(items._id)}>
                                {viewMore && mainViewMore === items._id ? "View Less" : "View More"}
                                <span>
                                  {viewMore && mainViewMore === items._id ? (
                                    <img src="/img/my-project-user/mobile/showlessmob.svg" alt="down.svg" />
                                  ) : (
                                    <img src="/img/my-project-user/mobile/showmoremob.svg" alt="up.svg" />
                                  )}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {viewMore && mainViewMore === items._id ? (
                        ""
                      ) : (
                        <div className={styles.productsMobSecMain}>
                          <div className={styles.productsMobSec}>
                            <div className={styles.productsMobSecHead}>Products</div>
                            <div>
                              <img
                                src="/img/my-project-user/mobile/prodmob.svg"
                                alt="prodmob.svg"
                                className={styles.prodmob}
                              />
                              <img
                                src="/img/my-project-user/mobile/prodmob.svg"
                                alt="prodmob.svg"
                                className={styles.prodmob}
                              />
                              <img
                                src="/img/my-project-user/mobile/prodmob.svg"
                                alt="prodmob.svg"
                                className={styles.prodmob}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.projStatusMainSecMob}>
                      <div className={styles.projStatusLeftMainMob}>
                        <div className={styles.profileStatusMob}>Status:</div>
                        <div className={styles.profileStatusMob}>Started on:</div>
                        <div className={styles.profileStatusMob}>Current stage:</div>
                        <div className={styles.profileStatusMob}>Payment status:</div>
                      </div>
                      <div className={styles.projStatusRightMainMob}>
                        <div className={styles.profileStatusMob}>{items?.status}</div>
                        <div className={styles.profileStatusMob}>{items?.starting_date}</div>
                        <div className={styles.profileStatusMob}>{items?.status}</div>
                        <div className={styles.profileStatusMob}>Pending</div>
                      </div>
                    </div>
                    {viewMore && mainViewMore === items._id ? (
                      <>
                        <div className={styles.suggestedProductsMainSecMob}>
                          <div className={styles.suggestedProductsMainMob}>
                            <div className={styles.suggestedProductHead}>Suggested Products</div>
                            <div className={styles.suggProdListMob}>3 Products list</div>
                          </div>
                        </div>
                        <div className={styles.suggestedBedProductsMainSecMob}>
                          <div className={styles.suggestedBedProductsMainMob}>
                            <div className={styles.suggestedBedProductHead}>04 Brdroom Products</div>
                            <div className={styles.suggProdListMob} onClick={() => toggleSuggProdMob(items._id)}>
                              {suggestProd && sugProd === items._id ? (
                                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                              ) : (
                                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                              )}
                            </div>
                          </div>
                          {suggestProd ? (
                            <div className={styles.bedProdMobMainSec}>
                              <img src="/img/my-project-user/mobile/bedprodmob.svg" alt="bedprodmob.svg" />
                              <img src="/img/my-project-user/mobile/bedprodmob2.svg" alt="bedprodmob2.svg" />
                              <img src="/img/my-project-user/mobile/pic3.svg" alt="bedprodmob.svg" />
                              <img src="/img/my-project-user/mobile/pic4.svg" alt="bedprodmob2.svg" />
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
                            <div className={styles.suggestedHallProductHead}>00 Hall Products</div>
                            <div className={styles.suggHallListMob}>
                              <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.fileUploadSecMainMob}>
                          <div className={styles.fileUploadSecMainMobHead}>
                            <div className={styles.fileUploadSecMainMobTitle}>
                              File manager{" "}
                              <span onClick={() => toggleFileBtnMob(items._id)}>
                                {viewFileMore && fileViewMore === items._id ? (
                                  <img src="/img/my-project-user/mobile/upmob.svg" alt="up.svg" />
                                ) : (
                                  <img src="/img/my-project-user/mobile/downmob.svg" alt="up.svg" />
                                )}
                              </span>
                            </div>
                            <div className={styles.fileSortSecMainMob}>
                              <img src="img/my-project-user/mobile/sortmob.svg" alt="sortmob.svg" />
                              Sort list
                            </div>
                            <div className={styles.createFolderSecMainMob}>
                              <img src="img/my-project-user/mobile/filetransmob.svg" alt="filetransmob.svg" />
                              Create folder
                            </div>
                          </div>
                        </div>
                        {viewFileMore ? (
                          <div className={styles.filesMobSecMain}>
                            <div className={styles.filesMobSec}>
                              <div className={styles.fileImgNameSec}>
                                <img src="img/my-project-user/mobile/folderMob.svg" alt="foldermob.svg" />
                                <div className={styles.filesMobTitle}>
                                  <div>Interior design</div>
                                  <small>21/12/2022</small>
                                </div>
                              </div>
                              <div className={styles.fileMoreMobSec}>
                                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
                              </div>
                            </div>
                            <div className={styles.filesMobSec}>
                              <div className={styles.fileImgNameSec}>
                                <img src="img/my-project-user/mobile/pdfmob.svg" alt="pdfmob.svg" />
                                <div className={styles.filesMobTitle}>
                                  <div>New lan.pdf</div>
                                  <small>21/12/2022</small>
                                </div>
                              </div>
                              <div className={styles.fileMoreMobSec}>
                                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
                              </div>
                            </div>
                            <div className={styles.filesMobSec}>
                              <div className={styles.fileImgNameSec}>
                                <img src="img/my-project-user/mobile/imgmob.svg" alt="imgmob.svg" />
                                <div className={styles.filesMobTitle}>
                                  <div>Oi design.jpg</div>
                                  <small>21/12/2022</small>
                                </div>
                              </div>
                              <div className={styles.fileMoreMobSec}>
                                <img src="img/my-project-user/mobile/moremob.svg" alt="moremob.svg" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className={styles.sentFileMainSecMob}>
                          <div className={styles.sentFileMainMob}>
                            <div className={styles.sentFileHead}>Send file to architect</div>
                            <div className={styles.sentFileListMob} onClick={() => toggleSentFileMob(items._id)}>
                              {sentFile && fileToArchitect === items._id ? (
                                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                              ) : (
                                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                              )}
                            </div>
                          </div>
                          {sentFile ? (
                            <div className={styles.sentFileUploadMainSecMob}>
                              <FnFileUploadMob projectId={items._id} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.fileFromMainSecMob}>
                          <FnFileFromArchMob projectId={items._id} />
                        </div>
                      </>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyProjectMobile;
