



import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  // Load user from localStorage first
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch current user from backend
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.warn(
        "Could not fetch user from server, using localStorage fallback."
      );
      return userData;
    }
  };

  // Send command to Gemini assistant
  const getGeminiResponse = async (text) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command: text },
        { withCredentials: true }
      );

      // Update local history
      if (res.data?.userInput && res.data?.response) {
        const entry = { user: res.data.userInput, ai: res.data.response };
        const updatedHistory = [...(userData?.history || []), entry];
        setUserData(prev => ({ ...prev, history: updatedHistory }));

        // Optional: sync to backend if needed
        await axios.put(
          `${serverUrl}/api/user/history`,
          { history: updatedHistory },
          { withCredentials: true }
        );
      }

      return res.data;
    } catch (error) {
      console.error("getGeminiResponse error:", error);
      return { response: "Sorry, something went wrong.", userInput: text };
    }
  };

  // On app load, fetch current user
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Sync userData to localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
    fetchCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;














