import React from "react";
import Login from "../components/Login/login";
import video from "../assets/Welcome.mp4";
import logo from "../assets/Welcome.gif";
// import DropdownMenu from "../components/dropdown";

function LoginPage () {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#202d33]">
      <div className="flex w-50 bg-[#E6CE00] rounded-lg m-10">
        {/* <h1>Welcome to Group Chat App</h1> */}
        {/* <video controls width="70%" className="videoPlayer" src={video}></video> */}
        <img src={logo} alt="Welcome to Group Chat App" className="flex rounded-lg w-100 h-100" />
      </div>
      <div className="flex justify-center items-center w-50 min-w-[500px] bg-[#0E242E] rounded-lg h-50 p-5 mr-10">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;