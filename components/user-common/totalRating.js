import api_url from "../../src/utils/url";
import axios from "axios";
import { useState } from "react";

export default function AgrihaArchitectTotalRating({ id }) {
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
      let r = 0;
      response.data.data.map((items) => {
        r += items.rating;
      });
      length = response.data.data.length;
      if (length !== 0) {
        let result = parseFloat(r / length).toFixed(2);
        setRating(result);
      } else {
        let result = 0;
        setRating(result);
      }
    });
  console.log(rating);
  return rating;
}

// export default async function AgrihaArchitectTotalRating({ id }) {
//   const token = localStorage.getItem("userToken");
//   let rating = 0;
//   let apiResult = axios
//     .get(`${api_url}/star-rating/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       let r = 0;
//       response.data.data.map((items) => {
//         r += items.rating;
//       });
//       length = response.data.data.length;
//       if (length !== 0) {
//         let result = parseFloat(r / length).toFixed(2);
//         return result;
//       } else {
//         let result = 0;
//         return result;
//       }
//     });
//   console.log(apiResult);

//   return rating;
// }
