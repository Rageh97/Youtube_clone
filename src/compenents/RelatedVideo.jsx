import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const RelatedVideo = () => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { videoId } = useParams();
  useEffect(() => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",

          key: "AIzaSyBc91am_Bx5R9ngk4nGqFm2xqCZkvvif2A",
          relatedToVideoId: videoId,
          type: "video",
          maxResults: 10,
        },
      })
      .then((response) => {
        setRelatedVideos(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [videoId]);

  return (
    <>
      <h2>Related Videos</h2>
      {relatedVideos.map((video) => (
        <div className="d-block d-lg-flex  gap-3 w-100 mb-2">
          <div className="w-100 h-100 w-lg-50">
            <a
              href={`https://www.youtube.com/embed/${video?.id?.videoId}`}
              rel="noopener noreferrer"
            >
              <img
              className="w-100"
                src={video?.snippet?.thumbnails?.default?.url}
                alt={video?.snippet.title}
              />
            </a>
          </div>

          <div className="d-flex flex-column w-100 w-lg-50  justify-content-center ">
            <h5 className="fw-bold fs-5">{video?.snippet?.title}</h5>
            <p className="fw-bold fs-6 mb-0">{video?.snippet?.channelTitle}</p>
            <p className="text-muted fs-6">{video?.snippet?.publishTime}.<span className="mx-1">Thousand Views 28</span></p>
          </div>
        </div>
      ))}
   
    </>
  );
};

export default RelatedVideo;
