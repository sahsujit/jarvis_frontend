// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
// import Customize from "./pages/Customize";
// import { userDataContext } from "./context/UserContext";
// import { Customize2 } from "./pages/Customize2";

// const App = () => {
//   const { userData, setUserData } = useContext(userDataContext);
//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             userData?.assistantImage && userData?.assistantName ? (
//               <Home />
//             ) : (
//               <Navigate to="/customize" />
//             )
//           }
//         />
//         <Route
//           path="/customize"
//           element={userData ? <Customize /> : <Navigate to="/signup" />}
//         />
//         <Route
//           path="/customize2"
//           element={userData ? <Customize2 /> : <Navigate to="/signup" />}
//         />
//         <Route
//           path="/signin"
//           element={!userData ? <SignIn /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/signup"
//           element={!userData ? <SignUp /> : <Navigate to="/customize" />}
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;





















import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import { userDataContext } from "./context/UserContext";
import { Customize2 } from "./pages/Customize2";

const App = () => {
  const { userData, loadingUser } = useContext(userDataContext);

  // Wait until the current user is fetched
  if (loadingUser) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/customize" />}
      />
    </Routes>
  );
};

export default App;
