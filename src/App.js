// Libraries
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';

// Components
import AnimeInfoCard from './components/universal-cards/AnimeInfoCard'
import EpisodeViewer from './components/universal-cards/EpisodeViewer';
import CategoryCarouselCard from './components/universal-cards/CategoryCarouselCard';

function App() {
  const urlHandler = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [urlHandler])

  return (
    <>
      <Routes>
        <Route exact path="/" element={<>
          <CategoryCarouselCard title={"Top Airing"} link={"trending"} />
          <CategoryCarouselCard title={"Recently Added"} link={"recent-episodes"} />
        </>} />
        <Route exact path="/Info/:path" element={<>
          <AnimeInfoCard playButton={true} />
        </>} />
        <Route exact path="/View/:path" element={<EpisodeViewer />} />
      </Routes>
    </>
  );
}

export default App;
