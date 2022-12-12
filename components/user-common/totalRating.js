import api_url from "../../src/utils/url";
import axios from "axios";
import React, { useState, useEffect } from "react";

function AgrihaArchitectTotalRating({ id, setRate }) {
  const [rating, setRating] = useState(0);
  const [l, setL] = useState(0);
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
      response?.data?.data?.map((items) => {
        r += items.rating;
      });
      length = response?.data?.data?.length;
      setL(length);
      if (length !== 0) {
        let result = parseFloat(r / length).toFixed(2);
        setRating(result);
      } else {
        let result = 0;
        setRating(result);
      }
    });
  setRate(parseFloat(rating));
  return rating;
  // return {
  //   TotalRating: rating,
  //   totalCount: l,
  // };
}
export default AgrihaArchitectTotalRating;

// export default function AgrihaArchitectTotalRating(id) {
//   var items = {};
//   // var items = [];
//   async function getRating({ id }) {
//     const token = localStorage.getItem("userToken");
//     const res = await fetch(`${api_url}/star-rating/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     var r = 0;
//     var result = 0;
//     data?.data?.map((i) => {
//       r += i.rating;
//     });
//     length = data?.data?.length;
//     if (length === 0) {
//       result = 0;
//     } else {
//       result = Number(parseFloat(r / length).toFixed(2));
//     }
//     // items.push({ length: length, rating: result });
//     Object.assign(items, { length: length }, { rating: result });
//   }
//   const getRatings = getRating({ id });

//   console.log(items);
//   console.log(items.length);
//   console.log(items.rating);

//   // return items;
//   return {
//     TotalRating: 3.55,
//     totalCount: 6,
//   };
// }
