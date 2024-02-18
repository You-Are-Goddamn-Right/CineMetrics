import { db } from "@/src/config/firebase";
import useAuth from "@/src/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent } from "@/components/ui/card";

import dayjs from "dayjs";
import { fetchDataFromApi } from "@/src/utils/api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Watchlist = () => {
  const { url } = useSelector((state) => state.home);
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();
  const [watchlistIds, setWatchlistIds] = useState([]);

  const watchlistArray = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      setWatchlistIds(userSnap.data().watchlist);
    } catch (err) {
      console.log(err.message);
    }
  };

  {
    currentUser &&
      useEffect(() => {
        watchlistArray();
      }, [db, currentUser]);
  }

  const fetchMovies = async () => {
    let promises = [];

    watchlistIds.forEach((watchlistId) => {
      promises.push(fetchDataFromApi(`/movie/${watchlistId}`));
    });

    const data = await Promise.all(promises);
    setMovies(data);
  };

  {
    currentUser &&
      useEffect(() => {
        fetchMovies();
      }, [watchlistIds]);
  }

  // console.log(movies)

  return (
    <>
      <div className="ypt-20 ysize-full">
        <div className="ytext-2xl ytext-center">Watchlist</div>
        <div className="yflex ysize-full">
          <div className="yflex yflex-wrap yjustify-center ygap-4 ypy-8 yw-full">
            {/* Hi, {currentUser.displayName}, your userId is {currentUser.uid} */}
            {movies.length===0 && (
              <div>
                Empty list, add films to watchlist to make it show here.
              </div>
            )}
            {movies.map((item, index) => {
              return (
                <div>
                  <Link to={`/film/${item.id}`} key={item.id}>
                    <div
                      key={item.id}
                      className="ycursor-pointer yp-1 yjustify-center  yflex yflex-col"
                    >
                      <Card className="hover:yborder-green-500 yborder-4 ytransition yduration-200 yease-in-out yh-[14.5rem] sm:yh-[20.5rem]">
                        <CardContent>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
