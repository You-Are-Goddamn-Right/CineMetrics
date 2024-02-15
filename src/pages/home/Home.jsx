import React from "react";

import Banner from "./banner/Banner";
import Popular from "./popular/Popular";
import Trending from "./trending/Trending";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div >
      <Banner />
      <div className="ypx-2">
      <TopRated/>
      <Trending />
      <Popular />
      </div>
    </div>
  );
};

export default Home;
