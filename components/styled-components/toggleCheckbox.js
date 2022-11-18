import React, {useState } from "react";

const ToggleCheckBox = ({toggleState,toggleAction, name}) => {
  return (
    <label className='inline-flex relative items-center cursor-pointer'>
      <input type='checkbox' value={name} onChange={toggleAction} checked={toggleState} className='sr-only peer' />
      <div className="w-11 h-3 bg-green-200 peer-focus:outline-none  peer-focus:ring-green-300 dark:peer-focus:ring-green-400 border-spacing-0 rounded-full peer dark:bg-gray-300  peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 shadow-sm after:border-gray-400  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-green-400"></div>
    </label>
  );
};

export default ToggleCheckBox;
