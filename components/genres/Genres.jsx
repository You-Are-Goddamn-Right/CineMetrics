import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="yflex ygap-2 yflex-wrap">
      {data?.map((g) => {
        if (!genres[g]) return <div>-</div>;
        return (
          <div className="ycursor-default yrounded-3xl yborder-2  ypx-3 ypy-1 ytext-xs yfont-semibold ytransition hover:ybg-white hover:ybg-opacity-50">
            <span key={g}>{genres[g]?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
