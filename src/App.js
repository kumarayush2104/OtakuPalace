// Libraries
import React from 'react'
import { Route, Routes } from 'react-router-dom';

// Components
import Home from './components/home/Home';
import AnimeInfoCard from './components/AnimeInfoCard';
import AnimeView from './components/anime-view/AnimeView';

function App() {

  return (
    <>
      <div className="container my-5">
        <div className="container-flex content-holder">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Info/:path" element={<AnimeInfoCard />} />
            <Route exact path="/View/:path" element={<AnimeView />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
