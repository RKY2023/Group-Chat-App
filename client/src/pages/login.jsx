import React from "react";
import Login from "../components/Login/login";
// import logo from "../assets/Welcome.gif";
import logo from "../assets/images/grf1.PNG";
// import DropdownMenu from "../components/dropdown";

function LoginPage () {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#202d33]">
      <div className="flex w-50 bg-[#E6CE00] rounded-lg m-10">
        <div className="flex justify-center items-center rounded-lg m-auto text-2xl">
          Group Chat App
        </div>
        {/* <video controls width="70%" className="videoPlayer" src={video}></video> */}
        <img src={logo} alt="Welcome to Group Chat App" className="flex rounded-lg w-50 h-50 ml-auto" />
      </div>
      <div className="flex justify-center items-center w-50 min-w-[500px] bg-[#0E242E] rounded-lg h-50 p-5 mr-10">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;