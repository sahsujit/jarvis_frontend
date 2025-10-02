

import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userImg from "../assets/user.gif";
import aiImg from "../assets/ai.gif";
import { HiMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [speechAllowed, setSpeechAllowed] = useState(false);

  const recognitionRef = useRef(null);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  // Speak text
  const speak = (text) => {
    if (!text || !speechAllowed) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.onstart = () => setIsSpeaking(true);
    msg.onend = () => {
      setIsSpeaking(false);
      setAiText("");
    };
    window.speechSynthesis.speak(msg);
  };

  // Call backend and handle Gemini response
  const getGeminiResponse = async (command) => {
    try {
      setIsThinking(true);
      const res = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      setIsThinking(false);

      const { type, userInput, response } = res.data;

      // Save history


      // Handle action types
      switch (type) {
        case "youtube_play":
          window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, "_blank");
          break;
        case "google_search":
          window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, "_blank");
          break;
        case "instagram_open":
          window.open("https://www.instagram.com", "_blank");
          break;
        case "facebook_open":
          window.open("https://www.facebook.com", "_blank");
          break;
        default:
          break;
      }

      return res.data;
    } catch (err) {
      console.error("getGeminiResponse error:", err);
      setIsThinking(false);
      return { response: "Sorry, something went wrong." };
    }
  };

  // Speech recognition
  useEffect(() => {
    if (!speechAllowed) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = async (event) => {
      const text = event.results[event.results.length - 1][0].transcript.trim();
      setUserText(text);

      if (text.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        const result = await getGeminiResponse(text);
        setAiText(result.response);
        speak(result.response);

        setTimeout(() => setUserText(""), 2000);
      }
    };

    recognition.onend = () => recognition.start();
    recognition.start();
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [speechAllowed, userData.assistantName]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center gap-[15px] relative">

      {/* Dark overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed top-0 w-full h-full bg-[#00000053] z-10 backdrop-blur-lg"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Hamburger menu button */}
      <div className="absolute top-4 left-4 md:hidden z-20">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <RxCross1 className="text-white w-8 h-8" /> : <HiMenu className="text-white w-8 h-8" />}
        </button>
      </div>

      {/* Hamburger menu */}
      <div
        className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 z-20 ${
          menuOpen ? "block" : "hidden"
        } md:flex md:flex-row md:gap-4`}
      >
        <button
          className="p-3 bg-white text-black rounded-2xl font-semibold md:min-w-[150px]"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="p-3 bg-white text-black rounded-2xl font-semibold md:min-w-[150px]"
          onClick={() => navigate("/customize")}
        >
          Customize
        </button>

      
      </div>

      {/* Assistant image */}
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg relative">
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>

      {/* Assistant name */}
      <h1 className="text-white font-semibold text-[20px]">
        I am {userData?.assistantName}
      </h1>

      {/* Start Assistant button */}
      {!speechAllowed && (
        <button
          className="mt-2 px-6 py-3 bg-white text-black rounded-2xl font-semibold"
          onClick={() => setSpeechAllowed(true)}
        >
          Start Assistant
        </button>
      )}

      {/* Switch images */}
      {isSpeaking ? (
        <img src={aiImg} alt="ai speaking" className="w-[200px]" />
      ) : speechAllowed ? (
        <img src={userImg} alt="user speaking" className="w-[200px]" />
      ) : null}

      {/* Dialogue box */}
      <div className="w-[280px] sm:w-[300px] md:w-[400px] h-[150px] bg-black/50 rounded-xl p-4 flex flex-col gap-2 overflow-y-auto text-white">
        {userText && (
          <p className="text-blue-400 text-lg md:text-xl">
            <strong className="text-white font-bold">You:</strong> {userText}
          </p>
        )}
        {aiText && (
          <p className="text-green-400 text-lg md:text-xl">
            <strong className="text-white capitalize font-bold">{userData?.assistantName}:</strong> {aiText}
          </p>
        )}
      </div>

  
    </div>
  );
};

export default Home;
