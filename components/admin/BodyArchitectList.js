import React from "react";
import ArchitectList from "./ArchitectList";
import HeaderDashboard from "./HeaderDashboard";

const BodyArchitectList = () => {
  return (
    <div>
      <div>
        <HeaderDashboard />
        <ArchitectList />
      </div>
    </div>
  );
};

export default BodyArchitectList;
