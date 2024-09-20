// services/login.ts
import axios from "@/lib/axios"; // Import your Axios instance
export const userSignup = async (formData:any) => {
    try {
        const response = await axios.post("/signup", formData); // Replace with your actual API URL
        console.log("Sign-up response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during sign-up:", error);
        throw new Error("Failed to log in");
    } finally {
        console.error("Error during sign-up:finally");
    }
};
