// import React, { useContext } from "react";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";

// const Home = () => {
//   const { userData, serverUrl , setUserData, getGeminiResponse } = useContext(userDataContext);

//   const navigate = useNavigate()

//   const handleLogout = async () => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       navigate("/signin");
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const speak = (text) => {
//     const msg = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(msg);
//   };


//   useEffect(() => {

//     const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new speechRecognition();
//     recognition.lang = 'en-US';
//     recognition.continuous = true;

//     recognition.onresult = async(event) => {
//       const text = event.results[event.results.length - 1][0].transcript.trim();
//      if(text.toLowerCase().includes(userData.assistantName.toLowerCase())){
//       const result  = await getGeminiResponse(text)
//       console.log(result);
//       speak(result.response)
       
//      }
//     }
//     recognition.start();
    
//   },[getGeminiResponse, userData.assistantName])
//   return (
//     <div
//       className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] 
//     flex flex-col items-center justify-center gap-[15px] relative "
//     >
      
//         <button
//           className="min-w-[300px] absolute top-[20px] right-[20px] cursor-pointer h-[60px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
//           onClick={() => {
//             handleLogout();
//           }}
//         >
//          Logout
//         </button>
//         <button
//           className="min-w-[300px] cursor-pointer h-[60px]   absolute top-[100px] right-[20px] text-[19px] rounded-2xl  bg-white  text-black font-semibold"
//           onClick={() => {
//             navigate("/customize");
//           }}
//         >
//           Customize Your Assistant
//         </button>

//       <div className="w-[300px] h-[400px]  flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
//         <img
//           src={userData?.assistantImage}
//           alt=""
//           className="h-full object-cover"
//         />
//       </div>

//       <h1 className="text-white font-semibold text-[20px]">
//         I'am {userData?.assistantName}
//       </h1>
//     </div>
//   );
// };

// export default Home;









































import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const recognitionRef = useRef(null); // keep recognition instance persistent
  const [speechAllowed, setSpeechAllowed] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const speak = (text) => {
    if (!text || !speechAllowed) return;
    window.speechSynthesis.cancel(); // stop previous speech
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  };


const handleCommand = (data) => {
  const { type, userInput, response } = data;

  // Speak the response first
  speak(response);

  switch (type) {
    case "google_search":
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
      break;

    case "youtube_search":
      const ytQuery = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${ytQuery}`, "_blank");
      break;

    case "youtube_play":
      const videoQuery = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${videoQuery}`, "_blank");
      break;

    case "calculator_open":
      window.open("https://www.google.com/search?q=calculator", "_blank");
      break;

    case "instagram_open":
      window.open("https://www.instagram.com", "_blank");
      break;

    case "facebook_open":
      window.open("https://www.facebook.com", "_blank");
      break;

    case "weather_show":
      window.open("https://www.google.com/search?q=weather", "_blank");
      break;

    case "general":
      // Already spoke response, nothing extra to do
      break;

    default:
      console.log("Unknown command type:", type);
      break;
  }
};

  useEffect(() => {
    if (!speechAllowed) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = async (event) => {
      const text = event.results[event.results.length - 1][0].transcript.trim();
      if (text.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        const result = await getGeminiResponse(text);

        console.log(result);
        handleCommand(result)
        speak(result.response);
      }
    };

    recognition.onend = () => {
      // Restart recognition after it stops
      recognition.start();
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      recognition.stop(); // cleanup on unmount
    };
  }, [speechAllowed, getGeminiResponse, userData.assistantName]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex flex-col items-center justify-center gap-[15px] relative">
      
      {!speechAllowed && (
        <button
          className="absolute top-[20px] left-[20px] p-3 bg-white text-black rounded-2xl font-semibold"
          onClick={() => setSpeechAllowed(true)}
        >
          Start Assistant
        </button>
      )}

      <button
        className="min-w-[300px] absolute top-[20px] right-[20px] cursor-pointer h-[60px] text-[19px] rounded-2xl bg-white text-black font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>

      <button
        className="min-w-[300px] cursor-pointer h-[60px] absolute top-[100px] right-[20px] text-[19px] rounded-2xl bg-white text-black font-semibold"
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>

      <h1 className="text-white font-semibold text-[20px]">
        I'am {userData?.assistantName}
      </h1>
    </div>
  );
};

export default Home;
