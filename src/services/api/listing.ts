// Code for fetching user listing
import axiosPublic from "@/lib/axiosPublic";
// Fetch user listing
export const userListing = async () => {
  try {
    const response = await axiosPublic.get("/posts");

    return response.data;
  } catch (error) {
    console.error("Error fetching user listing:", error);
    throw new Error("Failed to fetch user listing");
  }
};
export const userDetails = async (id:any) => {
  try {
    const response = await axiosPublic.get("/posts/"+id);

    return response.data;
  } catch (error) {
    console.error("Error fetching user listing details:", error);
    throw new Error("Failed to fetch user listing details");
  }
};
