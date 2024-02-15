import React from "react";

import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const posterUrl =
    "https://dummyimage.com/1000x1500/a8a5a8/353538&text=no+img+available";
  return (
    <>
      <div class="yz-20 yflex yflex-col ygap-y-6 yrelative ymb-4">
        <div class="ycontainer ytext-lg yfont-bold">Cast:</div>
        <Carousel className="ycontainer">
          <CarouselPrevious className="yz-50 yfixed ytop-0 yleft-0" />
          <CarouselNext className="yz-50 yfixed ytop-0 yright-0" />
          <CarouselContent>
          
            {loading ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem key={index + 1}>
                  <div>
                    <div>
                      <ul>
                        <li class="yflex yw-[25vw] ysnap-start yflex-col ygap-y-2 focus:youtline-none sm:yw-[150px]">
                          <Skeleton className="yh-60"/>
                        <div class="yflex yflex-col ytext-center">
                                <Skeleton class="ytruncate ytext-xs yfont-bold md:ytext-sm"/>
                                <Skeleton className="ytruncate ytext-xs"/>
                              </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CarouselItem>
                ))}
              </>
            ) : (
              <>
                {data?.map((item, index) => {
                  let imgUrl = item?.profile_path
                    ? url?.profile + item?.profile_path
                    : posterUrl;
                  return (
                    <CarouselItem key={index + 1}>
                      <div>
                        <div>
                          <ul>
                            <li class="yflex yw-[25vw] ysnap-start yflex-col ygap-y-2 focus:youtline-none sm:yw-[150px]">
                              
                              <LazyLoadImage effect="blur" src={imgUrl}/>
                              <div class="yflex yflex-col ytext-center">
                                <span
                                  title={item.name}
                                  class="ytruncate ytext-xs yfont-bold md:ytext-sm"
                                >
                                  {item.name}
                                </span>
                                <span
                                  title={item.character}
                                  class="ytruncate ytext-xs ytext-white/70"
                                >
                                  {item.character}
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Cast;
