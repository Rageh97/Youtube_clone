// VideoUploadForm.js


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideoStart, uploadVideoProgress, uploadVideoSuccess, uploadVideoFailure } from "../Redux/Slices/Upload"
import axios from 'axios';

const VideoUploadForm = () => {
  
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.upload.uploading);
    const progress = useSelector((state) => state.upload.progress);
    const error = useSelector((state) => state.upload.error);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      dispatch(uploadVideoStart());
  
      const metadata = {
        snippet: {
          title,
          description,
        },
      };
  
      const videoData = new FormData();
      videoData.append('part', 'snippet');
      videoData.append('video', videoFile, videoFile.name);
      videoData.append('uploadType', 'resumable');
  
      try {
        const response = await axios.post('https://www.googleapis.com/upload/youtube/v3/videos', metadata, {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with your access token
          },
          params: {
            uploadType: 'resumable',
          },
        });
  
        const uploadUrl = response.headers.location;
        await axios.put(uploadUrl, videoFile, {
          headers: {
            'Content-Type': videoFile.type,
          },
          onUploadProgress: (event) => {
            const progress = Math.round((event.loaded / event.total) * 100);
            dispatch(uploadVideoProgress(progress));
          },
        });
  
        dispatch(uploadVideoSuccess());
        // Handle success case, show success message, redirect to video page, etc.
      } catch (err) {
        dispatch(uploadVideoFailure(err.message));
        // Handle failure case, show error message, allow user to retry, etc.
      }
    };
  
  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="videoFile">Video File:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={uploading}>
          Upload
        </button>
        {uploading && <p>Uploading... Progress: {progress}%</p>}
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default VideoUploadForm;
