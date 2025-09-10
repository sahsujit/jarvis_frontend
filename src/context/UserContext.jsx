// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const userDataContext = createContext();
// const UserContext = ({ children }) => {
//   const serverUrl = "http://localhost:8000";

//   const [userData, setUserData] = useState(null);
//     const [frontendImage, setFrontendImage] = useState(null);
//     const [backendImage, setBackendImage] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);

//   const handleCurrentUser = async() =>{
//     try {
//       const result  = await axios.get(`${serverUrl}/api/user/current`,{withCredentials: true})
//       setUserData(result.data)
//       console.log(result);

//     } catch (error) {
//       console.log(error);
//     }
//   }


//   useEffect(() => {
//     handleCurrentUser()
//   }, [])


//   const value = {
//     serverUrl,
//     userData,
//     setUserData,
//     frontendImage,
//     setFrontendImage,
//     backendImage,
//     setBackendImage,
//     selectedImage,
//     setSelectedImage
//   };
//   return (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   );
// };

// export default UserContext;




// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const userDataContext = createContext();

// const UserContext = ({ children }) => {
//   const serverUrl = "http://localhost:8000";

//   const [userData, setUserData] = useState(() => {
//     // Load user from localStorage first
//     const saved = localStorage.getItem("userData");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [frontendImage, setFrontendImage] = useState(null);
//   const [backendImage, setBackendImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Fetch current user from backend
//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(`${serverUrl}/api/user/current`, {
//         withCredentials: true,
//       });

//       setUserData(response.data);
//       localStorage.setItem("userData", JSON.stringify(response.data));
//     } catch (error) {
//       console.warn("Could not fetch user from server, using localStorage fallback.");
//       localStorage.removeItem("userData");
//       setUserData(null);
//     }
//   };


//      const getGeminiResponse = async (text) => {
//     try {
//       const res = await axios.post(
//         `${serverUrl}/api/user/asktoassistant`,
//         { command: text },
//         { withCredentials: true }
//       );
//       return res.data;
//     } catch (error) {
//       console.error("getGeminiResponse error:", error);
//       return { response: "Sorry, something went wrong." };
//     }
//   };


  

//   // On app load, fetch current user
//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   // Sync userData to localStorage
//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("userData", JSON.stringify(userData));
//     } else {
//       localStorage.removeItem("userData");
//     }
//   }, [userData]);


 

//   const value = {
//     serverUrl,
//     userData,
//     setUserData,
//     frontendImage,
//     setFrontendImage,
//     backendImage,
//     setBackendImage,
//     selectedImage,
//     setSelectedImage,
//     getGeminiResponse
//   };

//   return (
//     <userDataContext.Provider value={value}>
//       {children}
//     </userDataContext.Provider>
//   );
// };

// export default UserContext;
























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
    } catch (error) {
      console.warn(
        "Could not fetch user from server, using localStorage fallback."
      );
      localStorage.removeItem("userData");
      setUserData(null);
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
      return res.data;
    } catch (error) {
      console.error("getGeminiResponse error:", error);
      return { response: "Sorry, something went wrong." };
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

  // Context value
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
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
