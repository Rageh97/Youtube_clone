import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  fetchRelatedVideos,
  relatedVideos,
  relatedVideoStatus,
} from "./../Redux/Slices/RelatedVideos";
import { useSelector } from "react-redux";
import Loading from "../Utils/Loading";
const RelatedVideo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const related = useSelector(relatedVideos);
  const status = useSelector(relatedVideoStatus);
  useEffect(() => {
    dispatch(fetchRelatedVideos(id));
  }, [id, dispatch]);
  return (
    <>
      <h2>Related Videos</h2>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          {related?.map((video) => (
            <div key={video.id} className="d-block d-lg-flex  gap-3 w-100 mb-2">
              <div className="w-100 h-100 w-lg-50">
                <Link to={`/videos/${video?.id.videoId}`}>
                  <img
                    className="w-100"
                    src={video?.snippet?.thumbnails?.default?.url}
                    alt={video?.snippet.title}
                  />
                </Link>
              </div>

              <div className="d-flex flex-column w-100 w-lg-50  justify-content-center ">
                <h5 className="fw-bold fs-5">{video?.snippet?.title}</h5>
                <p className="fw-bold fs-6 mb-0">
                  {video?.snippet?.channelTitle}
                </p>
                <p className="text-muted fs-6">
                  {video?.snippet?.publishTime}.
                  <span className="mx-1">Thousand Views 28</span>
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default RelatedVideo;
