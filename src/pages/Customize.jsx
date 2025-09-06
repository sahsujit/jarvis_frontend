import { useContext, useRef } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import image3 from "../assets/authBg.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import Card from "../components/Card";
import { userDataContext } from "../context/UserContext";
import { MdKeyboardBackspace } from "react-icons/md";

const Customize = () => {
  const {
     serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext)
  const navigate = useNavigate()

  const inputImage = useRef()
  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }



  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
    flex flex-col items-center justify-center p-[20px] relative"
    >
        <MdKeyboardBackspace
              className="absolute w-[25px] h-[25px] top-[30px] left-[30px] text-white cursor-pointer"
              onClick={() => navigate("/")}
            />
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Select Your <span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[900px] flex items-center gap-[15px] justify-center flex-wrap">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
        onClick={() => {
          inputImage.current.click()
          setSelectedImage("input")
        }}
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2
         border-[#0000ff66]  hover:shadow-2xl hover:shadow-blue-950
          hover:border-4 hover:border-white hover:scale-110  transition-all cursor-pointer
           duration-200 rounded-2xl overflow-hidden flex items-center justify-center 
           ${selectedImage === "input" ? "shadow-2xl shadow-blue-950 border-4 border-white scale-110" : null}`}
        >
          {
            frontendImage ? (
              <img
                src={frontendImage}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <RiImageAddLine className="text-white text-3xl" />
            )
          }
        </div>
        <input type="file" accept="image/*" ref={inputImage} className="hidden" onChange={handleImage}/>
      </div>

      {selectedImage ? <button
        type="submit"
        className="min-w-[150px] cursor-pointer h-[60px] mt-[30px]  text-[19px] rounded-2xl  bg-white  text-black font-semibold"
     onClick={() => navigate("/customize2")} >
        Next
      </button> : null}
     
    </div>
  );
};

export default Customize;
