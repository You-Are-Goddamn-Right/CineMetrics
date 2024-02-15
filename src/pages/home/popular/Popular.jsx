import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "@/src/assets/no-poster.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useSelector } from "react-redux";
import CircleRating from "@/components/circularRating/CircularRating";
import dayjs from "dayjs";
import { Link} from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TopRated = () => {
  const { data, loading } = useFetch(`/movie/popular`);
  const { url } = useSelector((state) => state.home);

  return (
    <div className=" sm:ypx-16 ypb-12">
      <h1 className="ytext-xl sm:ytext-2xl  ypy-6 yalign-baseline ypl-3">
        Popular
      </h1>
      <Carousel>
        <CarouselContent>
        {loading ? (
            <>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index + 1}>
                <Card>
                  <CardContent>
                    <Skeleton className="yrounded-xl yw-32 sm:yw-52 yh-56 sm:yh-80" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            </>
          ) : (
            <>
              {data?.results?.map((item, index) => (
                <CarouselItem key={index + 1}>
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
                      <div className="yhidden sm:yblock">
                        <CircleRating rating={item.vote_average.toFixed(1)} />
                      </div>

                      <div className="yw-32 sm:yw-52 ymb-2">
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
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
        <div className="yhidden sm:yblock">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default TopRated;
