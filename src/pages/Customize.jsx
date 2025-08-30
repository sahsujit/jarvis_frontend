import React from "react";
import image1 from "../assets/image1.png";
import image3 from "../assets/authBg.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import Card from "../components/Card";
import{RiImageAddLine} from "react-icons/ri"

const Customize = () => {
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
    flex flex-col items-center justify-center p-[20px]"
    >
        <h1 className="text-white text-[30px] mb-[40px] text-center">Select your <span className="text-blue-200">Assistant Image</span></h1>
      <div className="w-full max-w-[900px] flex items-center gap-[15px] justify-center flex-wrap">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div className="w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2
         border-[#0000ff66]  hover:shadow-2xl hover:shadow-blue-950
          hover:border-4 hover:border-white hover:scale-110  transition-all cursor-pointer
           duration-200 rounded-2xl overflow-hidden flex items-center justify-center">

            <RiImageAddLine className="text-white text-3xl" />
            
           </div>
           <input type="file" accept="image/*" className="hidden" />
      </div>
      <button
          type="submit"
          className="min-w-[150px] cursor-pointer h-[60px] mt-[30px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
        >
        Next
        </button>
    </div>
  );
};

export default Customize;
