// Libraries
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';

// Components
import Home from './components/home/Home';
import ToTopButton from './components/common/ToTopButton';
import EpisodeViewer from './components/episode-viewer/EpisodeViewer';
import AnimeInfoCard from './components/anime-info/AnimeInfoCard';
import SearchSection from './components/categorized/SearchSection';
import Navbar from './components/common/Navbar';
import CategorizedSection from './components/categorized/CategorizedSection';
import AdvancedSearchSection from './components/categorized/AdvancedSearchSection';
import Footer from './components/common/Footer';

function App() {
  const urlHandler = useLocation();

  useEffect(() => {
    // Scroll to top on Url change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }, [urlHandler]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Bottom To Top Button */}
      <ToTopButton />

      {/* Redirect Routes Start */}
      <Routes>
        {/* Home */}
        <Route exact path="/" element={<Home />} />

        {/* Categorized */}
        <Route exact path="/Trending" element={<CategorizedSection title={"Top Airing"} link={"trending?"} />} />
        <Route exact path="/Recently-Aired" element={<CategorizedSection title={"Recently Aired"} link={"recent-episodes?"} />} />
        <Route exact path="/Upcoming" element={<CategorizedSection title={"Upcoming Shows"} link={"advanced-search?status=NOT_YET_RELEASED&"} />} />

        {/* Advanced Search */}
        <Route exact path="/Advanced-Search" element={<AdvancedSearchSection />} />

        {/* Anime Information */}
        <Route exact path="/Info/:path" element={<AnimeInfoCard playButton={true} />} />

        {/* Anime Episode Viewer */}
        <Route exact path="/View/:path" element={<EpisodeViewer />} />

        {/* Anime Search Section */}
        <Route exact path="/Search/:path" element={<SearchSection />} />

        {/* Redirect everything else to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
      {/* Redirect Routes End */}

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
