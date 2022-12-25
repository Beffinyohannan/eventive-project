import axios from "axios";
// const baseURL = 'http://localhost:5000/api/admin'
const baseURL = process.env.REACT_APP_API_AXIOS

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let adminInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
adminInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin-token");
  config.headers.accesstoken = token;
  return config;
});

export default adminInstance;