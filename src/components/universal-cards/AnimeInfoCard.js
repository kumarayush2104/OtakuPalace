import React, { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';
import { Link, useLocation } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import CategoryCarouselCard from './CategoryCarouselCard';

export default function AnimeInfoCard(props) {
    const animeId = useLocation();

    const [animeInfo, setAnimeInfo] = useState(null);
    const [trailerView, setTrailerView] = useState(false);

    const handleTrailerView = () => {
        setTrailerView((prevTrailerView) => !prevTrailerView);
    };

    useEffect(() => {
        setAnimeInfo(null);
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/info/" + window.location.pathname.split("/")[2]);
                if (response.ok) {
                    const data = await response.json();
                    setAnimeInfo(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [animeId]);

    return (
        <>
            {animeInfo ? (
                <>
                    <section className="play-details">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="play-thumb mb-4">
                                                <img className="img-fluid" src={animeInfo.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-9">
                                    <div className="play-details-content">
                                        <div className="title-block d-flex align-items-center justify-content-between">
                                            <h2 className="play-title">{animeInfo.title.english ? animeInfo.title.english : animeInfo.title.romaji}</h2>
                                        </div>

                                        <div className="details-info mb-4">
                                            <span><i className="icofont-monitor mr-2"></i> {animeInfo.type}</span>
                                            <span><i className="icofont-ui-video-play mr-2"></i> {`Episodes: ${animeInfo.totalEpisodes}`}</span>
                                            <span><i className="icofont-clock-time mr-2" aria-hidden="true"></i> {animeInfo.releaseDate}</span>
                                            <span className="text-capitalize"><i className="icofont-volume-bar mr-2"></i> {animeInfo.subOrDub}</span>
                                        </div>

                                        <div className="details-desc">
                                            <p>{animeInfo.description ? ReactHtmlParser(animeInfo.description) : null}</p>
                                        </div>

                                        <div className="movie-persons mb-4">
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

                                            <div className="person-block">
                                                <h5 className="title">Status</h5>
                                                <p>{animeInfo.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {props.playButton ? (
                                <div className="details-buttons">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-6 col-xl mb-xl-0 mb-3">
                                            <Link to={`/View/${animeInfo.id}`} className="btn d-block hvr-sweep-to-right" tabIndex="0">
                                                <i className="icofont-ui-play mr-2" aria-hidden="true"></i>Play
                                            </Link>
                                        </div>
                                        {animeInfo.trailer ? <div className="col-6 col-xl mb-xl-0 mb-3">
                                            <a
                                                id="trailer"
                                                className="btn d-block hvr-sweep-to-right"
                                                onClick={handleTrailerView}
                                                tabIndex="0"
                                                data-toggle="modal"
                                                data-target="#trailer-modal"
                                                aria-hidden="true"
                                            >
                                                <i className="icofont-ui-movie mr-2" aria-hidden="true"></i>Trailer
                                            </a>

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
                                                                <iframe className="video d-block" width="100%" height="500px" controls src={"https://www.youtube.com/embed/" + animeInfo.trailer.id + "?autoplay=1"}></iframe>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div> : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </section>
                    {animeInfo.recommendations && animeInfo.recommendations.length > 0 ?
                        <CategoryCarouselCard data={animeInfo.recommendations} title={"Recommendations"} viewMoreButton={false} /> :
                        <CategoryCarouselCard title={"Top Airing"} link={"trending"} viewMoreButton={true} />
                    }
                </>
            ) : (
                <LoadingAnimation />
            )}
        </>
    );
}
