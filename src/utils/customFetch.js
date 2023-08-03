import axios from "axios";

const mainApiUrl = "https://galbry-backend-r8kf.onrender.com/api/";

const customFetch = ({ method, path, data = {} }) => {
  if (method.toLowerCase() === "post") {
    return axios.post(mainApiUrl + path, data);
  } else if (method.toLowerCase() === "get") {
    return axios.get(mainApiUrl + path, data);
  }
};

export default customFetch;
