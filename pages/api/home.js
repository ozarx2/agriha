import React, { useRef, useState, useEffect, useContext } from "react";

export default function test(req, res) {
  var allProject = {};
  async function getAllProjects() {
    const response = await fetch(`${api_url}/projects/getallprojects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      const withArchitect = data.data.filter((res) => res?.architect_id);
      allProject.push = { withArchitect };
      console.log(withArchitect);
    }
  }
  getAllProjects();
  res.status(200).json(allProject);
}
