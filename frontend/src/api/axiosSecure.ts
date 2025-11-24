import axios from "axios";
import { BACKEND_URL } from "./http";

const axiosSecure = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
    const csrfToken = localStorage.getItem("csrfToken");
    if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
});

export default axiosSecure;