import React, { useRef, useEffect, useState } from "react";

import MainMap from "./mainmap";
import MainNav from "./mainnav";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen">
      <MainNav>{children}</MainNav>
      <MainMap />
    </div>
  );
};

export default Layout;
