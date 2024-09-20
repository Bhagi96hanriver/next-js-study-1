"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { userDetails } from "@/services/api/listing";

export default function UserDetails() {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const [userData, setUserData] = useState<{
    userId: Number;
    id: Number;
    title: string;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Convert the string ID to a number before fetching user details
      fetchStudentsbyId(id);
    }
  }, [id]);

  const fetchStudentsbyId = async (ids: any) => {
    setLoading(true);
    try {
      const response = await userDetails(ids); // Fetch from the API
      console.log(response); // Update the state with fetched data
      setUserData(response);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          User Details for ID: {id}
        </h1>
        {userData ? (
          <div>
            <p className="text-lg font-semibold text-gray-700">
              Title: <span className="font-normal">{userData.title}</span>
            </p>
            <p className="mt-2 text-gray-600">
              Summary: <span className="font-normal">{userData.body}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {loading ? "Loading user details..." : "No data available"}
          </p>
        )}
      </div>
    </div>
  );
}
