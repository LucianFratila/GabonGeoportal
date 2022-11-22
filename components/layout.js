import React, { useRef, useEffect, useState, useMemo } from "react";
import MainNav from "./mainnav";
import MainMap from "./mainmap";
import useStore from "./(store)/store";
import GeneralModal from "./(shared-components)/general_modal";




const Layout = ({ children }) => {

  const mainMapSearchToggle = useStore((state) => state.mainMapSearchToggle);
  const changeMainMapSearchToggle = useStore((state) => state.changeMainMapSearchToggle);
  const changeMainMapSearchToggleFalse = useStore((state) => state.changeMainMapSearchToggle);

  return (
    <div className=" bg-slate-700">
      {mainMapSearchToggle&&<GeneralModal status={mainMapSearchToggle} toggle={changeMainMapSearchToggle} close={changeMainMapSearchToggleFalse} />}
      <MainNav>{children}</MainNav>
      <MainMap  />
    </div>
  );
};

export default Layout;
