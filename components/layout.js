import React, { useRef, useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import MainNav from "./mainnav";
import MainMap from "./mainmap";




const Layout = ({ children }) => {

  return (
    <div className=" bg-slate-700">
      <MainNav>{children}</MainNav>
      <MainMap  />
    </div>
  );
};

export default Layout;
