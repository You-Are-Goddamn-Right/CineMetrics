import React from "react";
import { GiFilmProjector } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
// import logo from "@/src/assets/CineMtrx_rmbg.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="yflex  yitems-center ycursor-pointer" onClick={()=>navigate("/")}>
      {/* <img src={logo} alt="logo" /> */}
      <GiFilmProjector className="ytext-4xl" /> 
      <span className="ytext-4xl">CineMtrx</span>
    </div>
  );
};

export default Logo;
