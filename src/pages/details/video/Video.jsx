import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useAuth from "@/src/hooks/useAuth";
import React from "react";

const Video = ({ tmdbId }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  return (
    <div className="yrelative ypt-24 yflex yjustify-center">
      {/* <Toaster /> */}

      {currentUser ? (
        <>
          {tmdbId && (
            <>
              <iframe
                src={`https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`}
                allowFullScreen
                title="Video"
                className="yw-full  yh-80 md:yw-full md:yh-96 lg:yh-128"
              />
            </>
          )}
        </>
      ) : (
        <>
          {tmdbId && (
            <>
              <iframe
                src={`https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`}
                allowFullScreen
                title="Video"
                className="yw-full  yh-80 md:yw-full md:yh-96 lg:yh-128"
              />
              <div
                onClick={() => {
                  toast({
                    description: "please login to watch the movie",
                    action: (
                      <ToastAction altText="Close">
                        close
                      </ToastAction>
                    ),
                    duration: 5000,
                  });
                }}
                className="ycursor-pointer yabsolute ytop-0 yleft-0 yw-full yh-full"
              ></div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Video;
