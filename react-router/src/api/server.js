import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5001/api",
});


server.interceptors.request.use(config => {
  const token = localStorage.getItem('jobs_portal_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } 
    return config;
}, error => {
  return Promise.reject(error);
});

export default server;