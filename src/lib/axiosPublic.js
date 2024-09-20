import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DUMMY, // Public API base URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPublic;