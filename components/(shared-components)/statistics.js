import React, { useState } from "react";

import { PieChart } from "react-minimal-pie-chart";

import { SlArrowUp } from "react-icons/sl";

const Statistics = ({ data }) => {
  const [open, isOpen] = useState(false);
  return (
    <section
      className={`flex flex-col overflow-auto p-4 mt-4 mb-4 rounded-md bg-neutral-700 ${
        open ? " h-[100%] duration-300" : " h-16   duration-300"
      } `}
    >
      <div className=' flex flex-row justify-between items-center'>
        <div>
          <h1 className=' text-maintext font-mono'>Statistics</h1>
        </div>
        <div className='text-maintext  '>
          <button
            onClick={() => {
              isOpen(!open);
            }}
            className=' rounded-full hover:bg-gray-600 p-2'
          >
            <SlArrowUp className={`${open ? "rotate-180 duration-200" : " rotate-0 duration-200"}`} size={20} />
          </button>
        </div>{" "}
      </div>
      {open ? (
        <>
          <div
            className={`flex flex-col gap-3   bg-neutral-600 rounded-md p-4 ${
              open ? " opacity-100 duration-500" : "opacity-0 duration-500"
            }  `}
          >
            {/* ITEM CHART */}
            <div className='w-1/2'>
              <PieChart startAngle={0} lengthAngle={360} lineWidth={30} animate={true} data={data} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {data.map((i) => (
                <span className='flex ' key={i.title}>
                  <span className=' flex flex-row gap-1 justify-center items-center mx-1'>
                    <p className=' text-xs text-maintext'>{`${i.value}%`}</p>
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: `${i.color}`,
                        borderRadius: "50%",
                        display: "inline-block",
                        padding: "5px",
                      }}
                    ></span>
                    <p className=' text-xs text-maintext'>{i.title}</p>
                  </span>
                </span>
              ))}
            </div>
            {/* ITEM CHART */}
             {/* ITEM CHART */}
             <div className='w-1/2'>
              <PieChart startAngle={0} lengthAngle={360} lineWidth={30} animate={true} data={data} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {data.map((i) => (
                <span className='flex ' key={i.title}>
                  <span className=' flex flex-row gap-1 justify-center items-center mx-1'>
                    <p className=' text-xs text-maintext'>{`${i.value}%`}</p>
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: `${i.color}`,
                        borderRadius: "50%",
                        display: "inline-block",
                        padding: "5px",
                      }}
                    ></span>
                    <p className=' text-xs text-maintext'>{i.title}</p>
                  </span>
                </span>
              ))}
            </div>
            {/* ITEM CHART */}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Statistics;

{
  /* <section>
      <div className=' flex p-4 flex-row items-center justify-between rounded-md mt-4 w-full  bg-neutral-700 '>
        <div>
          <h1 className=' text-maintext font-mono'>Statistics</h1>
        </div>
        <div className='text-maintext  '>
          <button
            onClick={() => {
              isOpen(!open);
            }}
            className=' rounded-full hover:bg-gray-600 p-2'
          >
            <SlArrowUp size={20} />
          </button>
        </div>
      </div>
      <div className={`rounded-md p-4 -mt-3  ${open?' h-46 overflow-visible  duration-300':"h-0 overflow-hidden  duration-300"}  bg-neutral-700`}>
        <div className={`flex gap-3 mt-7 bg-neutral-600 rounded-md p-4 my-4 ${open?' opacity-100 duration-500':'opacity-0 duration-500'}  `}>
          <div className='w-1/2'>
            <PieChart startAngle={0} lengthAngle={360} lineWidth={30} animate={true} data={data} />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {data.map((i) => (
              <span className='flex ' key={i.title}>
                <span className=' flex flex-row gap-1 justify-center items-center mx-1'>
                  <p className=' text-xs text-maintext'>{`${i.value}%`}</p>
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: `${i.color}`,
                      borderRadius: "50%",
                      display: "inline-block",
                      padding: "5px",
                    }}
                  ></span>
                  <p className=' text-xs text-maintext'>{i.title}</p>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section> */
}
