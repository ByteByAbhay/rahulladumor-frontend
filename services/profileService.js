import { personalInfo } from "../config/personalInfo";
import apiEndpoints from "../utils/api/apiEndpoints";

//get backend url 
const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3002";
};

//fetch profile data
export const fetchProfileData = async () => {
  try {
    const response = await fetch(`${getBackendUrl()}${apiEndpoints.profile}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      console.log("fetchProfileData ~ data:", data.data);
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch profile");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Return fallback data structure to prevent build failures
    return personalInfo;
  }
};

//fetch blogs
export const fetchBlogs = async () => {
  try {
    const response = await fetch(
      `${getBackendUrl()}${apiEndpoints.articles}`,
      {
        params: {
          page: 1,
          per_page: 12,
        },
      }
    );

    const data = await response.json();
    if (data.status === "success") {
      return data.data;
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Fallback to empty array if API fails
    return [];
  }
};
