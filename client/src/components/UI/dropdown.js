import React, { useRef, useState } from "react";
import RoundedBtn from "../Common/RoundedBtn";
// import { messagesData } from "../data/GroupChat";
import { HiDotsVertical } from "react-icons/hi";

const DropdownMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  
  const onClickHandler = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="flex flex-row-reverse">
      
    <button class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button" onClick={onClickHandler}>
      <RoundedBtn icon={<HiDotsVertical />} />
    </button>
    {isOpen && 
    <div className="relative w-32 h-32">
    <div className="z-10 absolute top-24 start-0 bg-[#ff0000] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" ref={dropdownRef}>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
          </li>
        </ul>
        <div className="py-2">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </div>
    </div>
    </div>
    }
    </div>
  );
};

export default DropdownMenu;