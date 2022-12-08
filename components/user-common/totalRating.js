import api_url from "../../src/utils/url";
import axios from "axios";
import React, { useState, useEffect } from "react";

// export default function AgrihaArchitectTotalRating({ id }) {
//   const [rating, setRating] = useState(0);
//   const token = localStorage.getItem("userToken");
//   axios
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
//         setRating(result);
//       } else {
//         let result = 0;
//         setRating(result);
//       }
//     });
//   console.log(rating);
//   return rating;
// }

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

// export default function AgrihaArchitectTotalRating(id) {
//   var items = { length: 0, rating: 0 };
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
//     data?.data?.map((i) => {
//       r += i.rating;
//     });

//     items.length = data?.data?.length;

//     if (items.length === 0) {
//       items.rating = 0;
//     } else {
//       items.rating = Number(parseFloat(r / items.length).toFixed(2));
//     }
//     Object.assign({}, items);
//     return items;
//   }

//   const ab = getRating({ id }).then((data) => {
//     return data.length;
//   });

//   console.log(ab.length);

//   return { length: 4, rating: 4.5 };
// }

// export default function AgrihaArchitectTotalRating(id) {
//   // var items = {};
//   var items = [];
//   const getRatings = getRating({ id })
//     .then((data) => {
//       return data;
//     })
//     .then();

//   console.log(getRatings);
//   // console.log(items.length);

//   // return items;
//   return {
//     TotalRating: 3.55,
//     totalCount: 6,
//   };
// }
// async function getRating({ id }) {
//   const token = localStorage.getItem("userToken");
//   const res = await fetch(`${api_url}/star-rating/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   return data.data;
//   // var r = 0;
//   // var result = 0;
//   // data?.data?.map((i) => {
//   //   r += i.rating;
//   // });
//   // length = data?.data?.length;
//   // if (length === 0) {
//   //   result = 0;
//   // } else {
//   //   result = Number(parseFloat(r / length).toFixed(2));
//   // }
//   // let itemPush = data.data;
//   // console.log(data.data);
//   // items.push(itemPush);
//   // Object.assign(items, { length: length }, { rating: result });
// }

function AgrihaArchitectTotalRating({ id, func }) {
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
  func(rating);
  return rating;
}
export default AgrihaArchitectTotalRating;
