import api_url from "../../src/utils/url";

var cache = {};
function getPageFromCache(url, callback) {
  if (cache[url]) {
    callback(undefined, cache[url]);
  } else {
    callback();
  }
}
function setPageToCache(url, content) {
  cache[url] = content;
}

export default function test(req, res) {
  getPageFromCache(req.url, async function (err, content) {
    if (err) return req.next(err);
    if (content) {
      console.log("working");
      res.send(content);
    } else {
      const response = await fetch(`${api_url}/projects/getallprojects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        const withArchitect = data.data.filter((res) => res?.architect_id);
        setPageToCache(req.url, withArchitect);
        res.status(200).json(withArchitect);
      }
      // res.render("index.jade", { title: "My Site" }, function (err, content) {
      //   // Render handler
      //   if (err) return req.next(err);
      //   setPageToCache(req.url, page);
      //   res.send(content);
      // });
    }
  });

  // async function getAllProjects() {
  //   const response = await fetch(`${api_url}/projects/getallprojects`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   if (data) {
  //     const withArchitect = data.data.filter((res) => res?.architect_id);
  //     res.status(200).json(withArchitect);
  //   }
  // }
  // getAllProjects();
}
