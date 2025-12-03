import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePassword from "./pages/CreatePassword";
import HomePage from "./pages/HomePage";
import RateMusicPage from "./pages/RateMusicPage";
import RatingMusicPage from "./pages/RatingMusicPage";
import TopArtistPage from "./pages/TopArtistPage";
import PostedPage from "./pages/PostedPage";
import ChartPage from "./pages/ChartPage";
import NewReleasesPage from "./pages/NewReleasesPage";
import NewsPage from "./pages/NewsPage";
import ArtistDetailPage from "./pages/ArtistDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rate" element={<RateMusicPage />} />
        <Route path="/rating" element={<RatingMusicPage />} />
        <Route path="/top-artist" element={<TopArtistPage />} />
        <Route path="/posted" element={<PostedPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/new-releases" element={<NewReleasesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
