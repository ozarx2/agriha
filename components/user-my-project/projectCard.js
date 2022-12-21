import Link from "next/link";
import React, { useEffect, useState } from "react";
import endpoint from "../../src/utils/endpoint";
import api_url from "../../src/utils/url";
import FnFileFromArchDesk from "./filefromarch";
import FnFileUploadDesk from "./fileuploaddesk";
import FnFileFolder from "./folders";
import FnPayment from "./payment";
import styles from "./project.module.css";
import FnSuggested from "./suggested";

const FnProjectCard = ({ index, name, bid, id, architectId, status, startDate }) => {
  const [showMore, setShowMore] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectprojectId, setSelectprojectId] = useState("");

  const [documents, setDocuments] = useState([]);
  const [sliced, setSliced] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const toggleBtn = (id) => {
    setShowMore((prevState) => !prevState);
    setSelectprojectId(id);
  };

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

  useEffect(() => {
    getUploadFile();
    getUploadedFiles();
  }, []);

  useEffect(() => {
    if (viewAll) {
      setSliced(documents);
    } else {
      setSliced(documents?.slice(0, 3));
    }
  }, [viewAll]);

  const viewAllClick = () => {
    if (!viewAll) {
      setViewAll(true);
    } else {
      setViewAll(false);
    }
  };

  let results = uploadedFiles.filter((res) => res.project_id === id);

  return (
    <div className={styles.mainSection}>
      <div>
        <div className={styles.ongoingProjectSection}>
          <div className={styles.projectNameSection}>
            <div className={styles.projectName}>Project {index + 1} </div>
            <div className={styles.projectId}>{name}</div>
          </div>
          <div className={styles.showMoreBtnSection}>
            {bid ? <div className={styles.bid}>Bid</div> : ""}
            <div id="less" className={styles.showMore} onClick={() => toggleBtn(id)}>
              {showMore && selectprojectId === id ? "Show Less" : "Show More"}

              {showMore && selectprojectId === id ? (
                <img src="/img/my-project-user/showup.svg" alt="up.svg" />
              ) : (
                <img src="/img/my-project-user/showdown.svg" alt="down.svg" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.onGoingProjSectionMain}>
          <div className={styles.secOne}>
            {architectId ? (
              <div className={styles.profileDpNameSection}>
                <Link href={`/user-architect-about/${architectId?._id}`} passHref>
                  <div className={styles.profileNameSec}>
                    <img
                      src={architectId?.profilepic ? architectId?.profilepic : "/img/my-project-user/profile.svg"}
                      alt="profile.svg"
                      className={styles.profileNameSecImg}
                    />
                    <div>{architectId?.firstname}</div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className={styles.profileDpNameSection}>
                <div className={styles.profileNameSec}>
                  <div>Architect not selected</div>
                </div>
              </div>
            )}

            <div className={styles.profileStatusSection}>
              <div className={styles.profileStatusLeft}>
                <div className={styles.profileStatus}>Status:</div>
                <div className={styles.profileStatus}>Started on:</div>
                <div className={styles.profileStatus}>Current stage:</div>
                <div className={styles.profileStatus}>Payment status:</div>
              </div>
              <div className={styles.profileStatusRight}>
                <div className={styles.profileStatus}>{status}</div>
                <div className={styles.profileStatus}>{startDate}</div>
                <div className={styles.profileStatus}>{status}</div>
                <div className={styles.profileStatus}>Pending</div>
              </div>
            </div>
          </div>
          <div className={styles.secTwo}>
            <FnFileUploadDesk projectId={id} allUploadedFiles={results} />
          </div>
          <div className={styles.secThree}>
            <FnFileFromArchDesk sliced={sliced} />
          </div>
        </div>
        <div className={styles.projDetails} id="projDetails">
          {showMore && selectprojectId === id ? (
            <>
              <FnSuggested />
              <FnPayment />
              <FnFileFolder documents={documents} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FnProjectCard;
