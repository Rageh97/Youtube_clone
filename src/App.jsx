import "./App.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import Login from "./compenents/Login";
import Header from "./compenents/Header";
import ChannelPage from "./pages/ChannelPage";
import Subscribtions from "./pages/Subscribtions";
import SearchPage from "./pages/SearchPage";
import VideosILiked from "./pages/VideosILiked";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos/:id" element={<VideoPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
          <Route path="/subscribtions" element={<Subscribtions />} />
          <Route path="/watch-later" element={<ChannelPage />} />
          <Route path="/search-result" element={<SearchPage />} />
          <Route path="/videos-i-liked" element={<VideosILiked />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
