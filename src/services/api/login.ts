// services/login.ts
import axios from "@/lib/axios"; // Import your Axios instance

// Define the type for the login payload and response
// interface LoginResponse {
//   token: string;
//   user: {
//     id: string;
//     userid: string;
//     name: string;
//   };
// }

// Login function that accepts userid and password, returns a promise with the response
export const userLogin = async (username: string, password: string) => {
  // export const userLogin = async (userid: string, password: string): Promise<LoginResponse> => {
  try {
    // const response = await axios.post<LoginResponse>('/api/auth/login', {
    const response = await axios.post(
      "/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Failed to log in");
  }
};
