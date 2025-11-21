import axios from 'axios';

const api = axios.create({
    baseURL: "https://task-manager-api-s8cm.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export function attachTokenInterceptor(token: string) {
    api.interceptors.request.use(
        (config) => {
            if(config.requiresAuth && token) {
                config.headers.Authorization = `Bearer ${token}`;   
            }
            return config;
        },
        (error) => Promise.reject(error)
    )
};

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const message = err.response?.data?.message || "API request failed";

        return Promise.reject(new Error(message));
    }
)

export default api;