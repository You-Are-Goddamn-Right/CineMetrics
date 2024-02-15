import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchDataFromApi } from "@/src/utils/api";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import PosterFallback from "@/src/assets/no-poster.png";
import { useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useFetch from "@/src/hooks/useFetch";
import Select from "react-select";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { data: genresData } = useFetch(`/genre/movie/list`);
  const { url } = useSelector((state) => state.home);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/movie`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/movie?page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, []);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
        setSortby(selectedItems);
        if (action.action !== "clear") {
            filters.sort_by = selectedItems.value;
        } else {
            delete filters.sort_by;
        }
    }

    if (action.name === "genres") {
        setGenre(selectedItems);
        if (action.action !== "clear") {
            let genreId = selectedItems.map((g) => g.id);
            genreId = JSON.stringify(genreId).slice(1, -1);
            filters.with_genres = genreId;
        } else {
            delete filters.with_genres;
        }
    }

    setPageNum(1);
    fetchInitialData();
};

  return (
    <div className="ypt-20">
      <div className="ytext-2xl ytext-center">Discover</div>
      <div className="ypt-10 ycontainer yflex ygap-3 yflex-col md:yflex-row">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="yw-full ytext-black ybg-gray-600"
                            
                            
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="yw-full ytext-black"
                        />
                    </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          
          <div className="yflex ysize-full">
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="yflex yflex-wrap yjustify-center ygap-4 ypy-8 yw-full"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loader />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <div>
                      <Link to={`/film/${item.id}`} key={item.id}>
                        <div
                          key={item.id}
                          className="ycursor-pointer yp-1 yjustify-center  yflex yflex-col"
                        >
                          <Card className="hover:yborder-green-500 yborder-4 ytransition yduration-200 yease-in-out yh-[14.5rem] sm:yh-[20.5rem]">
                            <CardContent className="">
                              <LazyLoadImage
                                effect="blur"
                                className=" yobject-cover  yrounded-[0.55rem] yw-32 sm:yw-52 yh-56 sm:yh-80"
                                src={
                                  item.poster_path
                                    ? url?.poster + item.poster_path
                                    : PosterFallback
                                }
                                title={item.title || item.name}
                              />
                            </CardContent>
                          </Card>
                          <div className="yhidden md:yblock"></div>

                          <div className="yw-32 md:yw-52 ymb-2">
                            <div
                              title={item.title || item.name}
                              className="yoverflow-hidden ywhitespace-nowrap ytext-ellipsis"
                            >
                              {item.title || item.name}
                            </div>
                            <div className="yopacity-50 ">
                              {dayjs(item.release_date).format("MMM D, YYYY")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
