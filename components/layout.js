import React, { useRef, useEffect, useState } from "react";

import MainMap from "./mainmap";
import MainNav from "./mainnav";

const Layout = ({ children }) => {
  return (
    <div>
      <MainNav>{children}</MainNav>
      <MainMap />
    </div>
  );
};

export default Layout;
