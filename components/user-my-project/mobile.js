/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
// import api_url from "../../src/utils/url";
var api_url = "https://arclif-agriha.herokuapp.com";

import styles from "./main.module.css";

const FnUserMyProjectMobile = () => {
  const [viewMore, setViewMore] = useState(false);
  const [viewFileMore, setViewFileMore] = useState(false);
  const [sentFile, setSentFile] = useState(false);
  const [fileData, setFileData] = useState(false);
  const [suggestProd, setsuggestProd] = useState(false);
  const [descriptionMob, setDescriptionMob] = useState("");
  const [projectMob, setProjectMob] = useState([]);
  const handlerMob = (e) => {
    setDescriptionMob(e.target.value);
  };
  const toggleBtnMob = () => {
    setViewMore((prevState) => !prevState);
  };
  const toggleFileBtnMob = () => {
    setViewFileMore((prevState) => !prevState);
  };
  const toggleSentFileMob = () => {
    setSentFile((prevState) => !prevState);
  };
  const toggleFileDataMob = () => {
    setFileData((prevState) => !prevState);
  };
  const toggleSuggProdMob = () => {
    setsuggestProd((prevState) => !prevState);
  };
  async function getProjectMob() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProjectMob(data.projects);
  }
  console.log(projectMob);
  useEffect(() => {
    getProjectMob();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.projMobSecMain}>
              {projectMob?.map((items, key) => {
                return (
                  <>
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
                              <img
                                src="/img/my-project-user/mobile/projprofile.svg"
                                alt="projprofile.svg"
                                className={styles.projprofileMob}
                              />
                              <div className={styles.viewMoreMob} onClick={toggleBtnMob}>
                                {viewMore ? "View Less" : "View More"}
                                <span>
                                  {viewMore ? (
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
                      {viewMore ? (
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
                    {viewMore ? (
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
                            <div className={styles.suggProdListMob} onClick={toggleSuggProdMob}>
                              {suggestProd ? (
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
                              <span onClick={toggleFileBtnMob}>
                                {viewFileMore ? (
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
                            <div className={styles.sentFileListMob} onClick={toggleSentFileMob}>
                              {sentFile ? (
                                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                              ) : (
                                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                              )}
                            </div>
                          </div>
                          {sentFile ? (
                            <div className={styles.sentFileUploadMainSecMob}>
                              <div className={styles.sentFileUploadMainSecMobTitle}>Upload files</div>
                              <input
                                className={styles.sentFileDescMob}
                                placeholder="Enter Description"
                                value={descriptionMob}
                                onChange={handlerMob}
                              />

                              <div id="FnUserMyProjectMobileUpload">
                                <Dragger {...props} className="dragger">
                                  Select file or <a href="">browse</a>
                                </Dragger>
                              </div>
                              <div className={styles.uploadFileDescMob}>
                                <img src="/img/my-project-user/mobile/uploadmob.svg" alt="uploadmob.svg" />
                                <div>UploadFile</div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.fileFromMainSecMob}>
                          <div className={styles.fileFromMainMob}>
                            <div className={styles.fileFromHead}>File from architect</div>
                            <div className={styles.fileFromListMob} onClick={toggleFileDataMob}>
                              {fileData ? (
                                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" />
                              ) : (
                                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" />
                              )}
                            </div>
                          </div>
                          {fileData ? (
                            <div className={styles.fileFromDataMainSecMob}>
                              <div className={styles.fileFromDataMainMob}>
                                <div className={styles.dataLeftMob}>
                                  <img src="/img/my-project-user/mobile/datatransmob.svg" alt="datatrans.svg" />
                                  Photograph.jpg
                                </div>
                                <div className={styles.dataRightMobUnlock}>
                                  <img src="/img/my-project-user/mobile/lockmob.svg" alt="unlock.svg" />
                                  Unlock file
                                </div>
                              </div>
                              <div className={styles.fileFromDataMainMob}>
                                <div className={styles.dataLeftMob}>
                                  <img src="/img/my-project-user/mobile/datatransmob.svg" alt="datatrans.svg" />
                                  Photograph.jpg
                                </div>
                                <div className={styles.dataRightMobDownload}>
                                  <img src="/img/my-project-user/mobile/downloadmob.svg" alt="downloadmob.svg" />
                                  Download
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
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
