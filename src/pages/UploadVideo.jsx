import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadVideo } from "../Redux/Slices/Upload";
import { Button } from "react-bootstrap";

const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState(null);
  const [thumbnail_url, setThumbnail_url] = useState(null);
  const [privacy, setPrivacy] = useState("public");

  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    setUrl(e.target.files[0]);
  };

  const handleThumbnailFileChange = (e) => {
    setThumbnail_url(e.target.files[0]);
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", url);
    formData.append("thumbnail_url", thumbnail_url);
    formData.append("privacy", privacy);

    // Dispatch the uploadVideo action with the FormData
    dispatch(uploadVideo(formData));

    // Reset the form fields
    setTitle("");
    setDescription("");
    setUrl(null);
    setThumbnail_url(null);
    setPrivacy("public");
  };

  return (
    <div
      style={{ marginTop: "60px" }}
      className="container-xxl d-flex align-items-center justify-content-center"
    >
      <div className="row w-100 login-card">
        <div className="col-12 w-100">
          <div className=" shadowDark w-100 d-flex flex-wrap">
            <form
              className="w-md-100"
              style={{ background: "transparent" }}
              onSubmit={handleSubmit}
            >
              <div className="name w-100">
                <input
                  className="form-control  mb-3 neumer-input w-100"
                  type="text"
                  placeholder="title"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="name">
                <textarea
                  className="form-control  mb-3 neumer-input"
                  placeholder="description"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
              <div className="name">
                <label className="mx-3 LINK text" htmlFor="videoFile">
                  Video File:
                </label>
                <input
                  className="form-control  mb-3 neumer-input"
                  type="file"
                  id="videoFile"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  required
                />
              </div>
              <div className="name">
                <label className="mx-3 LINK text" htmlFor="thumbnailFile">
                  Thumbnail File:
                </label>
                <input
                  className="form-control w-50 mb-3 neumer-input"
                  type="file"
                  id="thumbnailFile"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  required
                />
              </div>
              <div className="name">
                <label className="mx-3" htmlFor="privacy">
                  Privacy:
                </label>
                <select
                  className="form-control   neumer-input"
                  id="privacy"
                  value={privacy}
                  onChange={handlePrivacyChange}
                >
                  <option value="public">public</option>
                  <option value="private">private</option>
                </select>
              </div>
            </form>
           
            <div className="w-50 d-none d-md-flex">
              <img
                className="w-100"
                src="https://storyxpress.co/static-app/img/upload_illustration.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadForm;
