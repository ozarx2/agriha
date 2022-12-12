import api_url from "../../src/utils/url";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AgrihaArchitectTotalRating = (id) => {
  const [rate, setRate] = useState(0);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const getRate = async () => {
      const response = await axios.get(`${api_url}/star-rating/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let r = 0;
      response?.data?.data?.map((items) => {
        r += items.rating;
      });
      length = response?.data?.data?.length;
      setCount(length);
      if (length !== 0 && r) {
        let result = Math.round(parseFloat(r / length) * 100) / 100;
        setRate(result);
      } else {
        let result = 0;
        setRate(result);
      }
    };
    getRate();
  }, [id]);

  return {
    TotalRating: rate,
    totalCount: count,
  };
};

export default AgrihaArchitectTotalRating;
