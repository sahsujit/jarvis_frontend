import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const { userData, serverUrl , setUserData, getGeminiResponse } = useContext(userDataContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    recognition.onresult = async(event) => {
      const text = event.results[event.results.length - 1][0].transcript.trim();
     if(text.toLowerCase().includes(userData.assistantName.toLowerCase())){
      const result  = await getGeminiResponse(text)
      console.log(result);
       
     }
    }
    recognition.start();
    
  },[])
  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] 
    flex flex-col items-center justify-center gap-[15px] relative "
    >
      
        <button
          className="min-w-[300px] absolute top-[20px] right-[20px] cursor-pointer h-[60px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
          onClick={() => {
            handleLogout();
          }}
        >
         Logout
        </button>
        <button
          className="min-w-[300px] cursor-pointer h-[60px]   absolute top-[100px] right-[20px] text-[19px] rounded-2xl  bg-white  text-black font-semibold"
          onClick={() => {
            navigate("/customize");
          }}
        >
          Customize Your Assistant
        </button>

      <div className="w-[300px] h-[400px]  flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>

      <h1 className="text-white font-semibold text-[20px]">
        I'am {userData?.assistantName}
      </h1>
    </div>
  );
};

export default Home;
