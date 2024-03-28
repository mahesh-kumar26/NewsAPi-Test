// axiosInstance.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosRetry from "axios-retry";

const baseURL = process.env.REACT_APP_DEV_MODE;
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you may need, such as authorization headers
  },
});
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
// // Add a request interceptor for global configuration
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can modify the request config before it is sent
//     // For example, you may want to add an authentication token
//     const authToken = AsyncStorage.getItem("authToken");
//     if (authToken) {
//       config.headers.Authorization = `Bearer ${authToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response: any) => {
//     console.lof
//     return response;
//   },
//   (error) => {
//     // Handle response errors
//     if (error.response && error.response.status === 401) {
//       // Redirect to login or refresh token logic
//       // Example: window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
