import axios from "axios";
import { Toast } from "vant";
// import { UserModule } from "@/store/modules/user";
import config from "@/config";

const baseURL =
    process.env === "development" ? config.baseUrl.dev : config.baseUrl.pro;

const service = axios.create({
    baseURL,
    timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
    config => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        // if (UserModule.token) {
        // 	config.headers.Authorization = `Bearer ${UserModule.token}`;
        // }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// Response interceptors
service.interceptors.response.use(
    response => {
        // Some example codes here:
        // code == 0: success
        // code == 50001: invalid access token
        // code == 50002: already login in other place
        // code == 50003: access token expired
        // code == 50004: invalid user (user not exist)
        // code == 50005: username or password is incorrect
        // You can change this part for your own usage.
        const res = response.data;
        console.log(`request ${response.config.url}`, res);
        // TODO:暂时不处理code
        // if (res.code !== 0) {
        // 	Toast(res.message || "Error", {
        // 		type: "fail",
        // 	});
        // 	if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 		MessageBox.confirm(
        // 			"You have been logged out, try to login again.",
        // 			"Log out",
        // 			{
        // 				confirmButtonText: "Relogin",
        // 				cancelButtonText: "Cancel",
        // 				type: "warning",
        // 			}
        // 		).then(() => {
        // 			UserModule.ResetToken();
        // 			location.reload(); // To prevent bugs from vue-router
        // 		});
        // 	}
        // 	return Promise.reject(new Error(res.message || "Error"));
        // } else {
        // 	return response.data;
        // }
        return response.data;
    },
    error => {
        console.error("request error", error.response);
        const { data, status } = error.response;

        switch (status) {
            case 401:
                // UserModule.ResetToken();
                location.reload(); // To prevent bugs from vue-router
                break;
        }
        Toast(data.msg);
        return Promise.reject(error);
    }
);

export default service;
