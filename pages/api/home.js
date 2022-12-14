import React, { useRef, useState, useEffect, useContext } from "react";
import api_url from "../../src/utils/url";

export default function test(req, res) {
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
      res.status(200).json(withArchitect);
    }
  }
  getAllProjects();
}
