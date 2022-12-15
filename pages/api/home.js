import api_url from "../../src/utils/url";
import fetchWithCache from "../../components/global/fetchWithCache";

export default function test(req, res) {
  const url = `${api_url}/projects/getallprojects`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  getAllProjects();
  async function getAllProjects() {
    const data = await fetchWithCache(url, options);
    res.status(200).json(data);
  }
}
