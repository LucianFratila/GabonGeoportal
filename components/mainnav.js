import React, { useRef, useEffect, useState } from "react";

import MainMenuTabs from "./mainmenutabs";

import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

const MainNav = ({ children }) => {
  const [open, isOpen] = useState(true);
  const menuRef = useRef(null);
  const [width, setWidth] = useState(706); //for menu
  const [screenWidth, setScreenWidthWidth] = useState(750); //for menu

  

  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className='absolute z-50 h-[100%]   '>
          <div
            ref={menuRef}
            className={`bg-primary/95 overflow-x-auto  h-[100%]   ${
              open ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-16`
            } duration-1000`}
          >
            <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div className={`${!open && "opacity-0"} transition delay-300 duration-600 p-4 `}>
                <h1 className='text-xl text-maintext '>Gabon Geoportal</h1>
                <p className='text-xs text-maintext flex items-center gap-1 '>
                  Simone Weil{" "}
                  <button className=' hover:text-white'>
                    <IoMdArrowDropdown size={20} />
                  </button>
                </p>
              </div>
              {/* Menu Header */}

              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button
                  className={` bg-gray-600 hover:bg-gray-500 px-3 py-2  rounded-md duration-300  ${
                    !open && "scale-0"
                  }  `}
                >
                  <AiOutlineSearch className=' text-maintext text-2xl' />
                </button>
                <button
                  onClick={() => {
                    isOpen(!open);
                  }}
                  className={`${!open ? "bg-gray-600 hover:bg-gray-500 px-1 py-2  rounded-md" : ""}`}
                >
                  {!open ? (
                    <IoMdArrowDropleft
                      className={`text-maintext text-2xl rotate-180 duration-300 ${!open && "scale-100"} `}
                    />
                  ) : (
                    <CgClose
                      className={`text-maintext text-2xl hover:text-white duration-300 ${!open && " scale-100"}`}
                    />
                  )}
                </button>
              </div>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {/* Main Content */}
            <div
              className={`${
                !open ? " opacity-0 duration-200" : "opacity-100 duration-200 delay-500"
              }  flex flex-col p-4 `}
            >
              {/* Menu Tabs */}
              <MainMenuTabs width={width} open={open} />
              {/* Menu Tabs */}
              <div className={`${!open && "opacity-0 duration-200"}`}>{children}</div>
            </div>
            {/* Main Content */}
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
    </>
  );
};

export default MainNav;
