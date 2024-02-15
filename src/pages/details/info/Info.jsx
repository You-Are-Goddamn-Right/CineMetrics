import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "@/src/hooks/useFetch";
import PosterFallback from "@/src/assets/no-poster.png";
import Genres from "@/components/genres/Genres";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
  FaRegHeart,
  FaHeart,
  FaPlay,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useAuth from "@/src/hooks/useAuth";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/src/config/firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Info = ({ video, crew }) => {
  const { id } = useParams();

  const { data, loading } = useFetch(`/movie/${id}`);
  const { url } = useSelector((state) => state.home);

 

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const trailer = video?.find((t) => t.type === "Trailer");

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [isWatchlistFilled, setIsWatchlistFilled] = useState(false);

  useEffect(() => {
    const alreadyinWatchlist = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      console.log(userSnap.data().watchlist.includes(id))

      if (userSnap.data().watchlist.includes(id)) {
        setIsWatchlistFilled(!isWatchlistFilled);
      }
    };
    alreadyinWatchlist();
  }, [db, id, currentUser]);

  const handleWatchlistClick = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      console.log(docRef);
      if (!isWatchlistFilled) {
        //if false
        await updateDoc(docRef, {
          watchlist: arrayUnion(id),
        });
        setIsWatchlistFilled(!isWatchlistFilled);
        toast({
          description: "added to watchlist",
          action: (
            <ToastAction altText="Close">
              close
            </ToastAction>
          ),
          duration: 5000,
        });
      } else {
        await updateDoc(docRef, {
          watchlist: arrayRemove(id),
        });
        setIsWatchlistFilled(!isWatchlistFilled);
        toast({
          description: "removed from watchlist",
          action: (
            <ToastAction altText="Close">
              close
            </ToastAction>
          ),
          duration: 5000,
        });
      }
    } catch (err) {
      console.log(err.message);
    }

    // setIsWatchlistFilled(!isWatchlistFilled);
  };

  return (
    <div className="yrelative">
      <div className="ypt-20 ycontainer ymx-auto yflex yflex-col ygap-y-6 yp-6 ypb-3 lg:ygap-y-12 lg:yp-12 lg:ypb-6">
        <div class="yz-20 yflex yflex-col ygap-12 md:yflex-row">
          <div class="ymx-auto yh-[calc(clamp(150px,25vw,300px)/(2/3))] yw-[clamp(150px,25vw,300px)] ymin-w-[clamp(150px,25vw,300px)] md:ymx-0">
            <LazyLoadImage
              alt={data?.title || data?.name}
              src={
                data?.poster_path
                  ? url?.poster + data?.poster_path
                  : PosterFallback
              }
              title={data?.title || data?.name}
              width="300"
              height="450"
              class="yrounded-md yobject-cover"
            />
          </div>
          <div class="yflex yflex-col ygap-y-6 lg:ymax-w-3xl">
            <div class="yflex yflex-col ygap-y-1">
              <h1 class="ytext-xl yfont-bold md:ytext-3xl">
                {data?.title || data?.name}
              </h1>
              <div class="yflex yitems-center ygap-x-1">
                <h2 class="yfont-semibold ytext-white/70">
                  {data?.vote_average ? data?.vote_average : "?"}/10 ·{" "}
                  {dayjs(data?.release_date).format("YYYY")} ·{" "}
                  {data?.runtime ? toHoursAndMinutes(data?.runtime) : "?h?m"}
                </h2>
              </div>
            </div>
            <div class="yflex yflex-wrap yitems-center ygap-4">
              <span class="yrounded-md yborder-2 ypx-2 yuppercase ytext-white/70">
                {data?.status}
              </span>
              <Genres data={_genres} />
            </div>
            <div className="yflex ygap-4">
              <Dialog className="yrelative">
                <DialogTrigger>
                  <FaPlay className="ycursor-pointer" />
                </DialogTrigger>
                <DialogContent className="ymax-w-[1000px] yh-[400px]  md:yh-[500px]">
                  <div>
                    <iframe
                      className="ymt-4 yw-full yh-full"
                      src={`https://youtube.com/embed/${trailer?.key}`}
                      frameborder="0"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {!currentUser ? (
                <FaRegBookmark
                  className="ycursor-pointer"
                  onClick={() => {
                    toast({
                      description: "please login to add to watchlist",
                      action: (
                        <ToastAction altText="Close">
                          close
                        </ToastAction>
                      ),
                      duration: 5000,
                    });
                  }}
                />
              ) : (
                <>
                  {isWatchlistFilled ? (
                    <FaBookmark
                    
                      className="ycursor-pointer"
                      onClick={handleWatchlistClick}
                    />
                  ) : (
                    <FaRegBookmark
                      className="ycursor-pointer"
                      onClick={handleWatchlistClick}
                    />
                  )}
                </>
              )}
            </div>

            <div class="yflex yflex-col ygap-y-2">
              <h3 class="ytext-lg yfont-semibold ">Overview</h3>
              <p class="ytext-white/70">{data?.overview}</p>
            </div>
            <div class="yflex ymax-w-lg yjustify-between">
              {director?.length > 0 && (
                <div class="yflex-1">
                  <h3 class="yblock yfont-bold">Director(s)</h3>
                  <span class="yblock ytext-white/70">
                    {" "}
                    {director.map((d, i) => (
                      <span key={id}>
                        {d.name}
                        {i !== director?.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
