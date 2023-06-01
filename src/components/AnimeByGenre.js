// Libraries
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Components
import AnimeNonCarouselCard from './AnimeNonCarouselCard';
import LoadingAnimation from './LoadingAnimation';

export default function AnimeByGenre() {

    const [isError, setError] = useState(false);
    const [animeList, setAnimeList] = useState(null);
    const [animeGenre, setAnimeGenre] = useState("Action")

    // Handle Errors
    const toggleError = () => {
        setError(true)
    }

    useEffect(() => {
        // Fetches GenreWise Anime
        const fetchData = async () => {
            setAnimeList(null)
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/advanced-search?genres=[%22" + animeGenre + "%22]&perPage=6");
                if (response.ok) {
                    const data = await response.json();
                    setAnimeList(data.results);
                } else {
                    toggleError();
                }
            } catch (error) {
                toggleError();
                console.error(error);
            }
        };
        fetchData();
    }, [animeGenre]);

    return (
        <div className="genre-section container-flex p-lg-5 p-2">
            <div className="container">

                {/* Title Start */}
                <div className="season-header text-center">
                    <h2 className="text-uppercase">Popular Anime by Genre</h2>
                </div>
                {/* Title End */}

                <div className="season-tabs my-5">

                    {/* Genre tabs Start */}
                    <ul className="nav nav-pills mb-3 justify-content-center mb-5" id="pills-tab-seasons" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button onClick={() => setAnimeGenre("Action")} className={`genre-button m-1 ${animeGenre === "Action" ? "active" : ""}`}>Action</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button onClick={() => setAnimeGenre("Comedy")} className={`genre-button m-1 ${animeGenre === "Comedy" ? "active" : ""}`}>Comedy</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button onClick={() => setAnimeGenre("Romance")} className={`genre-button m-1 ${animeGenre === "Romance" ? "active" : ""}`}>Romance</button>
                        </li>
                    </ul>
                    {/* Genre tabs End */}

                    <div className="tab-content">
                        <div className="tab-pane animated fadeInRight show active">

                            {/* Tab Content Start */}
                            <div className="row">
                                {isError ? <h1 className='text-white text-center'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                                    animeList ?
                                        animeList.map((element) => <AnimeNonCarouselCard
                                            id={element.id}
                                            image={element.image}
                                            title={element.title.english ? element.title.english : element.title.romaji}
                                            releaseYear={element.releaseDate}
                                            genres={element.genres}
                                        />) : <LoadingAnimation />}
                            </div>
                            {/* Tab Content End */}

                        </div>
                    </div>
                </div>

                {/* View More Button Start */}
                <Link to={`/Category/Genre`} className="btn d-block view-more-button hvr-sweep-to-right" tabIndex="0">
                    View More
                </Link>
                {/* View More Button End */}
            </div>
        </div>
    )
}
