import React, { useState, createContext } from "react";

export const StoreContext = createContext();
export const StoreContextProvider = (props) => {
  const [addProject, setAddProject] = useState(false);
  const [menu, setMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [addProjectImagePopup, setAddProjectImagePopup] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUploadPopup, setFileUploadPopup] = useState(false);
  const [ongoingPopup, setOngoingPopup] = useState(false);
  const [searchpopup, setSearchpopup] = useState(false);
  const [architectId, setArchitectId] = useState("");
  const [architectData, setArchitectData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userProjectsDetails, setUserProjectsDetails] = useState([]);
  const [fileUploadId, setFileUploadId] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [ongoingId, setOngoingId] = useState([]);
  const [projectId, setProjectId] = useState([]);
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [otpPopup, setOtpPopup] = useState(false);
  const [loginDetails, setLoginDetails] = useState(false);

  const [bid, setBid] = useState(false);
  const [bidArchitectId, setBidArchitectId] = useState(null);

  const Store = {
    addProject,
    setAddProject,
    menu,
    setMenu,
    logout,
    setLogout,
    notificationPopup,
    setNotificationPopup,
    addProjectImagePopup,
    setAddProjectImagePopup,
    files,
    setFiles,
    fileUploadPopup,
    setFileUploadPopup,
    ongoingPopup,
    setOngoingPopup,
    architectId,
    setArchitectId,
    projects,
    setProjects,
    userProjects,
    setUserProjects,
    fileUploadId,
    setFileUploadId,
    architectData,
    setArchitectData,
    searchpopup,
    setSearchpopup,
    activityLog,
    setActivityLog,
    ongoingId,
    setOngoingId,
    projectId,
    setProjectId,
    userProjectsDetails,
    setUserProjectsDetails,
    loginPopup,
    setLoginPopup,
    registerPopup,
    setRegisterPopup,
    otpPopup,
    setOtpPopup,
    bid,
    setBid,
    bidArchitectId,
    setBidArchitectId,
  };

  return <StoreContext.Provider value={[Store]}>{props.children}</StoreContext.Provider>;
};
