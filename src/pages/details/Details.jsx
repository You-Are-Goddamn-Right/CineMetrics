import React from "react";
import Info from "./info/Info";
import { useParams } from "react-router";
import useFetch from "@/src/hooks/useFetch";
import Cast from "@/src/pages/details/cast/Cast";
import Video from "@/src/pages/details/video/Video";
import { useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
const Details = () => {
  const { id } = useParams();

  const { url } = useSelector((state) => state.home);
  const {
    data: backDropImage,
    loading,
    error: invalidId,
  } = useFetch(`/movie/${id}`);
  console.log("invalidId:", invalidId);
  const { data, loading: videoLoading } = useFetch(`/movie/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/movie/${id}/credits`
  );
  console.log(data);



  if (loading || videoLoading || creditsLoading){
    return <Loader />;
  }

  {
    if ( invalidId) {
      return (
        <div className="ypt-20 yh-full yw-full ytext-center">
          Invalid Id/check your internet connection
        </div>
      );
    } else {
      return (
        <div className="yw-full">
          <img
            src={url?.backdrop + backDropImage?.backdrop_path}
            alt="Backdrop"
            className="yz-negative1 yfixed yobject-cover yh-screen yw-screen yopacity-5"
          />
          <Video tmdbId={id} />
          <Info video={data?.results} crew={credits?.crew} />
          <Cast data={credits?.cast} loading={creditsLoading} />
        </div>
      );
    }
  }
};

export default Details;
