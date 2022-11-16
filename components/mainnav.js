import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";

const MainNav = ({ children }) => {
  const menu = {
    menuitem: [
      { name: "Concessions", link: "/concessions" },
      { name: "Harvesting", link: "/harvesting" },
      { name: "Transports", link: "/transports" },
      { name: "Processing sites", link: "/processing_sites" },
      { name: "Exports", link: "/exports" },
      { name: "Satellite imagery", link: "/satelite_imagery" },
    ],
  };
  const [open, isOpen] = useState(true);
  const menuRef = useRef(null);
  const [width, setWidth] = useState(706); //for menu
  const [screenWidth, setScreenWidthWidth] = useState(706); //for menu
  const [sliderPos, SetSliderPos] = useState(0);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 50;
    SetSliderPos(slider.scrollLeft);
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 50;
    SetSliderPos(slider.scrollLeft);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(menuRef.current.offsetWidth);
      setScreenWidthWidth(window.innerWidth);
    });
  }, [screenWidth]);

  return screenWidth < 750 ? (
    <>
      {/* MOBILE MENU < 750 */}
      <div>
        <div className={`absolute ${!open ? "-left-[170px] duration-75" : "left-0 duration-75"}  z-50 h-screen`}>
          <div ref={menuRef} className={`bg-primary/95 gap-3 flex p-2 duration-1000`}>
            <div>
              <h1 className='text-xl text-maintext '>Gabon Geoportal</h1>
              <p className='text-xs text-maintext flex items-center gap-1 '>
                Simone Weil{" "}
                <button className=' hover:text-white'>
                  <IoMdArrowDropdown size={20} />
                </button>
              </p>
            </div>
            <div
              onClick={() => {
                isOpen(!open);
              }}
              className=' text-maintext'
            >
              <HiMenu size={30} />
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
    </>
  ) : (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className='absolute z-50 h-screen  '>
          <div
            ref={menuRef}
            className={`bg-primary/95 overflow-x-auto  p-6   flex flex-col relative  ${
              open ? ` lg:w-[800px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-16`
            } duration-1000`}
          >
            <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
              <div className={`${!open && "opacity-0"} transition delay-300 duration-600 `}>
                <h1 className='text-xl text-maintext '>Gabon Geoportal</h1>
                <p className='text-xs text-maintext flex items-center gap-1 '>
                  Simone Weil{" "}
                  <button className=' hover:text-white'>
                    <IoMdArrowDropdown size={20} />
                  </button>
                </p>
              </div>
              <div className='flex justify-end'>
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
            </div>
            <div
              className={`${
                !open ? " opacity-0 duration-200" : "opacity-100 duration-200 delay-500"
              }  my-8 flex flex-col h-screen`}
            >
              <div>
                <div
                  id='slider'
                  className={`overflow-hidden  py-2 ${
                    width < 700 ? "mx-5" : "mx-4"
                  } flex flex-row gap-6 border-b scroll-smooth duration-650 border-secundary`}
                >
                  {menu.menuitem.map((i) => (
                    <div key={i.name}>
                      <Link
                        className='whitespace-nowrap w-30 pb-2  hover:border-b-2 border-green-600 text-maintext text-sm'
                        href={i.link}
                      >
                        {i.name}
                      </Link>
                    </div>
                  ))}
                  <div className={` whitespace-nowrap `}>
                    <button
                      onClick={slideRight}
                      className={`bg-gray-600 hover:bg-gray-500 px py-1 right-2 rounded-sm absolute `}
                    >
                      <IoMdArrowDropleft
                        className={`text-maintext text-1xl rotate-180 duration-300 ${!open && "scale-100"} `}
                      />
                    </button>
                    <button
                      onClick={slideLeft}
                      className={`bg-gray-600 hover:bg-gray-500 px py-1 left-2 rounded-sm absolute ${
                        sliderPos <= 50 ? "scale-0" : ""
                      }`}
                    >
                      <IoMdArrowDropleft className={`text-maintext text-1xl  duration-300 ${!open && "scale-100"} `} />
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${!open && "opacity-0 duration-200"}`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
    </>
  );
};

export default MainNav;
