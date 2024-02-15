import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="yz-40 ypy-1 yflex yjustify-between yitems-center ypx-2 sm:ypx-16 yborder-b yfixed yw-full  ybg-transparent ybackdrop-blur">
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
