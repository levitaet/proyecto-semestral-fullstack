import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api";

const http = axios.create({
  baseURL: `${BACKEND_URL}`, // URL base
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
export { BACKEND_URL };
