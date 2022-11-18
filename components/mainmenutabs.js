import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

import { IoMdArrowDropleft } from "react-icons/io";

const MainMenuTabs = ({ width, open }) => {
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
  return (
    <div className=' flex flex-row h-full px-2 '>
      <div className={` flex flex-row whitespace-nowrap `}>
      <button
          onClick={slideLeft}
          className={`bg-gray-600 hover:bg-gray-500 px py-1  rounded-sm  ${sliderPos <= 50 ? "scale-0" : ""}`}
        >
          <IoMdArrowDropleft className={`text-maintext text-1xl  duration-300 ${!open && "scale-100"} `} />
        </button>
      </div>
      <div
        id='slider'
        className={`overflow-hidden flex flex-row gap-6 border-b border-secundary scroll-smooth duration-650 mx-[10px]   `}
      >
        {menu.menuitem.map((i) => (
          <div key={i.name}>
            <Link
              className='mainnavlink text-maintext'
              href={i.link}
            >
              {i.name}
            </Link>
          </div>
        ))}
      </div>
      <div>
       
        <button onClick={slideRight} className={`bg-gray-600 hover:bg-gray-500 px py-1  rounded-sm  `}>
          <IoMdArrowDropleft className={`text-maintext text-1xl rotate-180 duration-300 ${!open && "scale-100"} `} />
        </button>
      </div>
    </div>
  );
};

export default MainMenuTabs;
