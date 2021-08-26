import axios from "axios";
import { Toast } from "vant";
import { UserModule } from "@/store/modules/user";
import config from "@/config";

export const baseURL =
    process.env === "development" ? config.baseURL.dev : config.baseURL.pro;

const service = axios.create({
    baseURL,
    timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
    config => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        if (UserModule.token) {
            // config.headers.Authorization = `Bearer ${UserModule.token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// Response interceptors
service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log(`request ${response.config.url}`, res);
        return response.data;
    },
    error => {
        console.error("request error", error.response);
        const { data, status } = error.response;
        switch (status) {
            case 401:
                UserModule.resetToken();
                location.reload(); // To prevent bugs from vue-router
                break;
        }
        Toast(data.msg);
        return Promise.reject(error);
    }
);

export default service;
