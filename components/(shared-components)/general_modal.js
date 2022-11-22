import useStore from "../(store)/store";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

//Import the below modules using "npm i -save request oauth-1.0a crypto"

const GeneralModal = ({close }) => {

  return (
    <div className=' w-full h-full flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
      <div className='relative w-2/5 my-6 mx-auto max-w-3xl'>
        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#373637] outline-none focus:outline-none'>
          <div className='flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t '>
            <h3 className='text-2xl text-maintext font=semibold'>Search</h3>
            <button className='bg-transparent border-0 text-black float-right' onClick={close}>
              <AiOutlineClose size={25} className=' text-maintext' />
            </button>
          </div>
          <div className='relative p-6 flex-auto'>
            <div>
              <form>
                <label for='search' class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                  Search
                </label>
                <div class='relative'>
                  <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <svg
                      aria-hidden='true'
                      class='w-5 h-5 text-gray-500 dark:text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      ></path>
                    </svg>
                  </div>
                  <input
                    type='search'
                    id='search'
                    class='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search'
                    required
                  />
                  <button
                    type='submit'
                    class='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
