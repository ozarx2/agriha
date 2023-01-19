import React, { useState, createContext } from "react";

export const StoreContext = createContext();
export const StoreContextProvider = (props) => {
  const [addProject, setAddProject] = useState(false); // project add for architect dashboard
  const [menu, setMenu] = useState(false); // menu for architect dashboard
  const [logout, setLogout] = useState(false); // logout for architect dashboard
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [addProjectImagePopup, setAddProjectImagePopup] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUploadPopup, setFileUploadPopup] = useState(false);
  const [ongoingPopup, setOngoingPopup] = useState(false);
  const [searchpopup, setSearchpopup] = useState(false); // mobile serch popup for agriha homepage
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
  const [bid, setBid] = useState(true);
  const [bidArchitectId, setBidArchitectId] = useState(null);
  const [loginActive, setLoginActive] = useState(false);
  const [architectSelectPopup, setArchitectSelectPopup] = useState(false);
  const [architectBidPopup, setArchitectBidtPopup] = useState(false);
  const [bidDataPopup, setBidDataPopup] = useState(false);
  const [allBidArchitect, setAllBidArchitect] = useState([]);

  // Store Yaseen start
  const [bidUserId, setBidUserId] = useState("");
  const [searchQueryArchitect, setSearchQueryArchitect] = useState("");
  const [allArchitects, setAllArchitects] = useState([]);
  const [projectResponse, setProjectResponse] = useState([]);
  const [arcDashQueue, setArcDashQueue] = useState(false);
  const [zonePopup, setZonePopUp] = useState(false);
  const [requirementPopup, setRequirementPopup] = useState(false);
  // Store Yaseen end

  // Store 61-5a start
  const [profilePopup, setProfilePopup] = useState(false);
  const [fromLoginOrRegister, setFromLoginOrRegister] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [bidArchitectSelectPopup, setBidArchitectSelectPopup] = useState("");
  const [displayBidItems, setDisplayBidItems] = useState([]);
  const [displayBidArchitet, setDisplayBidArchitet] = useState([]);
  const [architectProfileSelectPopup, setArchitectProfileSelectPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [requestOrBid, setRequestOrBid] = useState("");
  const [requestOrBidID, setRequestOrBidID] = useState("");
  // Store 61-5a end

  // Store Hashir start
  // Store Hashir end

  // Store SHIJIN start
  const [landingPage, setLandingPage] = useState(1);
  const [arcPaginatioCount, setArcPaginationCount] = useState(1);
  // Store SHIJIN end

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
    loginActive,
    setLoginActive,
    architectSelectPopup,
    setArchitectSelectPopup,
    architectBidPopup,
    setArchitectBidtPopup,
    bidDataPopup,
    setBidDataPopup,
    allBidArchitect,
    setAllBidArchitect,

    // Store Yaseen start
    bidUserId,
    setBidUserId,
    searchQueryArchitect,
    setSearchQueryArchitect,
    allArchitects,
    setAllArchitects,
    projectResponse,
    setProjectResponse,
    arcDashQueue,
    setArcDashQueue,
    zonePopup,
    setZonePopUp,
    requirementPopup,
    setRequirementPopup,
    // Store Yaseen end

    // Store 61-5a start
    profilePopup,
    setProfilePopup,
    fromLoginOrRegister,
    setFromLoginOrRegister,
    userId,
    setUserId,
    userRole,
    setUserRole,
    bidArchitectSelectPopup,
    setBidArchitectSelectPopup,
    displayBidItems,
    setDisplayBidItems,
    displayBidArchitet,
    setDisplayBidArchitet,
    architectProfileSelectPopup,
    setArchitectProfileSelectPopup,
    sharePopup,
    setSharePopup,
    shareUrl,
    setShareUrl,
    requestOrBid,
    setRequestOrBid,
    requestOrBidID,
    setRequestOrBidID,
    // Store 61-5a end

    // Store Hashir start

    // Store Hashir end

    // Store SHIJIN start
    landingPage,
    setLandingPage,
    arcPaginatioCount,
    setArcPaginationCount,

    // Store SHIJIN end
  };

  return <StoreContext.Provider value={[Store]}>{props.children}</StoreContext.Provider>;
};
