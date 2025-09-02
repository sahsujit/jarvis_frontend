import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Customize2 = () => {
    const {userData}= useContext(userDataContext)
    const [AssistantName,setAssistantName]=useState(userData?.AssistantName || "")
    const navigate = useNavigate()
  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
    flex flex-col items-center justify-center p-[20px]"
    >
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg. Jarvis"
        required

        value={AssistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className="w-full max-w-[600px] h-[60px] outline-none border-2 px-[20px] py-[10px] text-[18px] rounded-2xl border-white bg-transparent placeholder-gray-300 text-white"
      />

      {AssistantName && (
        <button
          type="submit"
          className="min-w-[300px] cursor-pointer h-[60px] mt-[30px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
          onClick={() => navigate("")}
        >
          Finally Create Your Assistant
        </button>
      )}

     
    </div>
  );
};
