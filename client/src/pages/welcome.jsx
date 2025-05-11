import React from "react";
import Login from "../components/Login/login";
// import logo from "../assets/Welcome.gif";
import logo from "../assets/images/grf1.PNG";
// import DropdownMenu from "../components/dropdown";

function WelcomePage () {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#202d33]">
        <div className="flex flex-col justify-center items-center w-1/2 h-full p-5" style={{flex: 1}}>
          <h1 className="text-3xl mb-5">Welcome to Group Chat App</h1>
          <img src={logo} alt="Welcome to Group Chat App" className="rounded-lg w-full h-auto" />
        </div>
        <div className="flex justify-center items-center w-1/2 h-screen bg-[#0E242E] rounded-lg p-5" style={{flex: 1}}>
          <Login />
        </div>
    </div>
  );
};

export default WelcomePage;