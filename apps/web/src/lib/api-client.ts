import axios from "axios";
import { config } from "@/app/config/env";

const apiClient = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: config.apiTimeout,
});

export { apiClient };