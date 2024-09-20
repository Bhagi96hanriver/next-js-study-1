"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook for redirection
import { userSignup } from "@/services/api/signup"; // Import the userSignup function
export default function SignupPage() {
  const [formData, setFormData] = useState({
    company_id: 1,
    ip_address: "",
    name: "",
    email: "",
    mobile: "",
    username: "",
    gender: "m",
    floor: "",
    password: "",
    confirm_password: "",
    platform: "web",
  });
  const router=useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await userSignup(formData); // Call the login API
      console.log("Sign-up response:", data.data);
      router.push('/login'); // Programmatically navigate to the user list page
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("Sign-up failed. Please try again.");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          {/* Email */}
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          {/* Mobile */}
          <label className="block mb-2">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />

          {/* Username */}
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />

          {/* Gender */}
          <label className="block mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>

          {/* Floor */}
          <label className="block mb-2">Floor</label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />

          {/* Password */}
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          {/* Confirm Password */}
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
