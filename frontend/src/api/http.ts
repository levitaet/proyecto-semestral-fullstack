import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api", // URL base
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
