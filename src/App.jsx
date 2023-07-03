import "./App.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Header from "./compenents/Header";
import Subscribtions from "./pages/Subscribtions";
import SearchPage from "./pages/SearchPage";
import VideosILiked from "./pages/VideosILiked";
import Register from "./pages/Register";
import UserChannel from "./pages/UserChannel";
import Setting from "./pages/Setting";
import WatchLater from "./pages/WatchLater";
import ChannelRoutes from "./compenents/ChannelRoutes";
import MobileFooter from "./compenents/MobileFooter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/videos/:id" element={<VideoPage />} />

          <Route path="/channel/:id/*" element={<ChannelRoutes />} />

          <Route path="/subscribtions" element={<Subscribtions />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/search-result" element={<SearchPage />} />
          <Route path="/videos-i-liked" element={<VideosILiked />} />
          <Route path="/user-channel" element={<UserChannel />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
        <MobileFooter/>
      </BrowserRouter>
    </>
  );
}

export default App;
