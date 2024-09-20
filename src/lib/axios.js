// lib/axios.js (client-side version)
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set base URL from environment variable
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Accept-Language": process.env.NEXT_PUBLIC_LANG,
  },
});

// Set up interceptors for requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get("token");

    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up interceptors for responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if no errors
    return response;
  },
  (error) => {
    // Handle errors globally, e.g., token expiration or API errors
    if (error.response?.status === 401) {
      // Optionally handle token expiration (e.g., redirect to login)
      console.error("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
