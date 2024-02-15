import React, { useEffect, useState } from "react";
import useFetch from "@/src/hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Banner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading, error } = useFetch(
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country="
  );
  // console.log(data)

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results[Math.floor(Math.random() * data?.results?.length)]
        .backdrop_path;
    setBackground(bg);
  }, [data, url]);
  console.log(background);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const searchButton = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="yw-full yh-[450px] yflex  yrelative md:yh-[750px]">
      {!loading && (
        <div className="yz-negative1 yh-full yw-full yabsolute ytop-0 yleft-0 yopacity-50  yoverflow-hidden">
          <img
            className="yblock yw-full yh-full yobject-cover yobject-center"
            src={background}
          />
        </div>
      )}

      <div className="yw-full yh-[250px] yabsolute ybottom-0 yleft-0  ygradient-layer"></div>

      <div className="ycontainer">
        <div className="yflex yitems-center yrelative yflex-col ytop-[10rem] md:ytop-[14rem]">
          <div className="ytext-[2.5rem] md:ytext-[5rem]">CineMetrics</div>
          <div className="yflex yitems-center yw-full md:yw-[calc(100%-400px)]">
            <input
              className="ypl-10  yrounded-s-full yh-12 ybg-[#131d1b] youtline-none yborder-none yw-full "
              type="search"
              placeholder="Search for a film..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Button
              className="yh-[2.9rem] yrounded-r-full"
              variant="outline"
              onClick={searchButton}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
