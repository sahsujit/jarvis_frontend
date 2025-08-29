import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl} = useContext(userDataContext)
  const [err, setErr] = useState("");

  const handleSignUp = async(e)=>{
    e.preventDefault();
    setErr("")
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        name, email, password
      },{withCredentials: true});

      console.log(result);

   if (result.status === 200) {
  setName("");
  setEmail("");
  setPassword("");
  navigate("/signin");
}

    } catch (error) {
      console.log(error);
      setErr(error.response.data.message)
    }
  }

  const navigate = useNavigate()
  return (
    <div
      className="w-full h-[100vh]  bg-cover bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form onSubmit={handleSignUp}
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] px-[20px]
       backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] "
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}

          className="w-full h-[60px] outline-none border-2 px-[20px] py-[10px] text-[18px] rounded-2xl border-white bg-transparent placeholder-gray-300 text-white"
        />

        <input
          type="email"
          placeholder="Enter your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[60px] outline-none border-2 px-[20px] py-[10px] text-[18px] rounded-2xl border-white bg-transparent placeholder-gray-300 text-white"
        />

        <div className="w-full h-[60px] relative outline-none border-2  text-[18px] rounded-2xl border-white bg-transparent  text-white">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {err.length > 0 && <p className="text-red-400 text-[17px]">*{err}</p>}

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
