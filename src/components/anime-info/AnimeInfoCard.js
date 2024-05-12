// Libraries
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';

// Components
import LoadingAnimation from '../common/LoadingAnimation';
import CategoryCarouselCard from '../common/CategoryCarouselCard';

export default function AnimeInfoCard(props) {

    const [isError, setError] = useState(false);
    const animeId = useLocation();
    const [animeInfo, setAnimeInfo] = useState(null);
    const [trailerView, setTrailerView] = useState(false);

    // Handle trailerView
    const handleTrailerView = () => {
        setTrailerView((prevTrailerView) => !prevTrailerView);
    };

    // Handle Errors
    const handleError = () => {
        setError(true);
    }

    useEffect(() => {
        // Fetches Anime Information
        setAnimeInfo(null);
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.streamsora.live/meta/anilist/info/" + window.location.pathname.split("/")[2]);
                if (response.ok) {
                    const data = await response.json();
                    setAnimeInfo(data);
                } else {
                    handleError();
                }
            } catch (error) {
                handleError();
                console.error(error);
            }
        };
        fetchData();
    }, [animeId]);

    return (
        <section className="play-details">
            <div className="container">
                {isError ?
                    // Error Banner Start
                    <h1 className='text-white text-center'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                    // Error Banner End

                    animeInfo ? (
                        <>

                            <div className="row align-items-center">

                                {/* Image Section Start */}
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="play-thumb mb-4">
                                                <img className="img-fluid" src={animeInfo.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Image Section End */}

                                <div className="col-md-9">
                                    <div className="play-details-content">

                                        {/* Title Section Start */}
                                        <div className="title-block d-flex align-items-center justify-content-between">
                                            <h2 className="play-title">{animeInfo.title.english ? animeInfo.title.english : animeInfo.title.romaji}</h2>
                                        </div>
                                        {/* Title Section End */}

                                        {/* Other Details Section Start */}
                                        <div className="details-info mb-4">
                                            <span><i className="icofont-monitor mr-2"></i> {animeInfo.type}</span>
                                            <span><i className="icofont-ui-video-play mr-2"></i> {`Episodes: ${animeInfo.totalEpisodes}`}</span>
                                            <span><i className="icofont-clock-time mr-2" aria-hidden="true"></i> {animeInfo.releaseDate}</span>
                                            <span className="text-capitalize"><i className="icofont-volume-bar mr-2"></i> {animeInfo.subOrDub}</span>
                                        </div>
                                        {/* Other Details Section End */}

                                        {/* Description Section Start */}
                                        <div className="details-desc">
                                            <p>{animeInfo.description ? ReactHtmlParser(animeInfo.description) : null}</p>
                                        </div>
                                        {/* Description Section End */}

                                        <div className="movie-persons mb-4">
                                            {/* Genre Section Start */}
                                            <div className="person-block">
                                                <h5 className="title">Genre</h5>
                                                <p>
                                                    {animeInfo.genres.map((element) => (
                                                        <span key={element} className="m-1">
                                                            {element}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                            {/* Genre Section End */}

                                            {/* Status Section Start */}
                                            <div className="person-block">
                                                <h5 className="title">Status</h5>
                                                <p>{animeInfo.status}</p>
                                            </div>
                                            {/* Status Section End */}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Play and Trailer Section Start */}
                            {props.playButton ? (
                                <div className="details-buttons">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-6 col-xl mb-xl-0 mb-3">
                                            <Link to={`/View/${animeInfo.id}`} className="btn d-block hvr-sweep-to-right" tabIndex="0">
                                                <i className="icofont-ui-play mr-2" aria-hidden="true"></i>Play
                                            </Link>
                                        </div>

                                        {/* Trailer Section Start */}
                                        {animeInfo.trailer ? <div className="col-6 col-xl mb-xl-0 mb-3">
                                            <button
                                                id="trailer"
                                                className="btn w-100 hvr-sweep-to-right"
                                                onClick={handleTrailerView}
                                                tabIndex="0"
                                                data-toggle="modal"
                                                data-target="#trailer-modal"
                                                aria-hidden="true"
                                            >
                                                <i className="icofont-ui-movie mr-2" aria-hidden="true"></i>Trailer
                                            </button>

                                            {trailerView && (
                                                <div className="modal fade show" id="trailer-modal" tabIndex="0" role="dialog" aria-labelledby="trailer-modal" aria-hidden="true">
                                                    <div className="modal-dialog modal-lg" role="document" id="trailerModal">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Trailer</h5>
                                                                <button type="button" className="close" onClick={handleTrailerView} data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">
                                                                        <i className="fa-solid fa-xmark"></i>
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <iframe title="Trailer" className="video d-block" width="100%" height="500px" controls src={"https://www.youtube.com/embed/" + animeInfo.trailer.id + "?autoplay=1"}></iframe>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div> : null}
                                        {/* Trailer Section End */}

                                    </div>
                                </div>
                            ) : null}
                            {/* Play and trailer Section End */}

                            {/* Recommendation or Top Airing Section Start */}
                            {animeInfo.recommendations && animeInfo.recommendations.length > 0 ?
                                <CategoryCarouselCard data={animeInfo.recommendations} title={"Recommendations"} viewMoreButton={false} /> :
                                <CategoryCarouselCard title={"Top Airing"} link={"trending"} viewMoreButton={true} />
                            }
                            {/* Recommendation or Top Airing Section End */}
                        </>
                    ) : (
                        <LoadingAnimation />
                    )}
            </div>
        </section>
    );
}
