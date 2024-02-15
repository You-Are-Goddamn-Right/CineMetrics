import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '@/src/utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import PosterFallback from "@/src/assets/no-poster.png";
import dayjs from 'dayjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Search = () => {
    
  const { url } = useSelector((state) => state.home);
    const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/movie?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className='ypt-20'>
        {loading ? (<Loader />) : (
            <div>
                <div className="ytext-xl ycontainer yflex yjustify-center
                 ymb-6">{`Search results for "${query}"`}</div>
<div className="yflex ysize-full">
            {data?.results?.length > 0 ? (
                <>
                <InfiniteScroll
                className="yflex yflex-wrap yjustify-center ygap-4 ypy-8 yw-full"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loader />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person" || item.media_type=== "tv") return;
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
                </>
              
            ) : (
              <span className="ycontainer ytext-center">No results... try another query</span>
            )}
          </div>
            </div>
        )}
    </div>
  )
}

export default Search