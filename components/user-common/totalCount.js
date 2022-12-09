import api_url from "../../src/utils/url";
import axios from "axios";
import { useState } from "react";

export default function AgrihaArchitectTotalCount({ id }) {
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("userToken");
  axios
    .get(`${api_url}/star-rating/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      length = response.data.data.length;
      setRating(length);
    });

  return rating;
}
