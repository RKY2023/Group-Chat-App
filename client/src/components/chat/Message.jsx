import React from "react";
import { useSelector } from "react-redux";

function Message(props) {
  const userId = useSelector(state => state.auth.userId);
  // const 
  // console.log('meessgae users', userId, props.userId);
  const fadeInClassCss = 'fadeer';

  return (
    <div key={props.id}
      className={`flex flex-col justify-center items-center rounded-md w-fit my-1 ${
        (props.userId === userId) ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
      }`}
    > 
      {(props.userId !== userId && props.userName !== '') ? 
        <div className="w-100 text-xs text-white  p-1">
          {props.userName}
        </div>
       :
      (
        <></>
      )
      }
      {/* Image msg  */}
      {props.img ? (
        <div className="relative w-100 p-2">
          <img
            src={props.img}
            alt="img_messge"
            className="rounded-md max-w-[270px] w-100"
          />
          {/* Time  */}
          <p 
            className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
            {props.time}
          </p>
        </div>
      ) : (
        // Text msg or Link 
        <div className="flex justify-between items-end max-w-[400px] p-1 px-2 "
          style={{ wordBreak: "break-word" }}>
          {props.isLink ? (
            <a 
              href={props.message}
              target="blank"
              className="text-[#53beec] p-1 focus:text-[#53beec] active:text-[#53beec] text-sm underline hover:underline mr-2"
            >
              {props.message}
            </a>
          ) : (
            // Normal text 
            <p className={`text-white text-sm mr-2 ${fadeInClassCss}`}> 
              {props.message}
            </p>
          )}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">
            {props.time}
            </p>
        </div>
      )}
    </div>
  );
}

export default Message;
