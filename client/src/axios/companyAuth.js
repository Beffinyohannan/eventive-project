import axios from "axios";
// const baseURL = 'http://localhost:5000/api'
const baseURL = process.env.REACT_APP_API_AXIOS

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let companyInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
  companyInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('company-token');
  config.headers.accesstoken = token;
  return config;
});

export default companyInstance;