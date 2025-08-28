import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  return (
    <div
      className="w-full h-[100vh]  bg-cover bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] px-[20px]
       backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] "
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-[60px] outline-none border-2 px-[20px] py-[10px] text-[18px] rounded-2xl border-white bg-transparent placeholder-gray-300 text-white"
        />

        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full h-[60px] outline-none border-2 px-[20px] py-[10px] text-[18px] rounded-2xl border-white bg-transparent placeholder-gray-300 text-white"
        />

        <div className="w-full h-[60px] relative outline-none border-2  text-[18px] rounded-2xl border-white bg-transparent  text-white">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="w-full h-full outline-none  px-[20px] py-[10px]  rounded-2xl  placeholder-gray-300 text-white"
          />
          {showPassword ? (
            <IoEyeOff
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[18px] right-[20px] cursor-pointer  w-[25px] h-[25px]"
            />
          ) : (
            <IoEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[18px] right-[20px] cursor-pointer  w-[25px] h-[25px]"
            />
          )}
        </div>

        <button
          type="submit"
          className="min-w-[150px] h-[60px] mt-[30px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
        >
          Register
        </button>

        <p className="text-white text-[18px] ">Already have an account? <span onClick={() => navigate("/signin")} className="text-blue-400 cursor-pointer underline ">Login</span></p>
      </form>
    </div>
  );
};

export default SignUp;
