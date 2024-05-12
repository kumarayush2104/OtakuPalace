// Libraries
import React, { useEffect, useState } from 'react';
import { Player } from 'react-tuby';
import "react-tuby/css/main.css";
import ReactHlsPlayer from '@ducanh2912/react-hls-player';
import { useLocation } from 'react-router-dom';

// Components
import EpisodeCard from './EpisodeCard';
import LoadingAnimation from '../common/LoadingAnimation';
import AnimeInfoCard from '../anime-info/AnimeInfoCard';

export default function EpisodeViewer() {

    const [isError, setError] = useState(false);
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [currentEpisodeSource, setCurrentEpisodeSource] = useState(null);
    const [totalEpisodes, setTotalEpisodes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const urlLocation = useLocation();

    // Handle Errors
    const handleError = () => {
        setError(true)
    }

    useEffect(() => {

        // Fetches Anime Information
        const fetchAnimeInfo = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "https://api.streamsora.live/meta/anilist/info/" +
                    window.location.pathname.split("/")[2]
                );
                if (response.ok) {
                    const data = await response.json();
                    setTotalEpisodes(data.episodes);
                } else {
                    handleError();
                    throw new Error("Failed to fetch anime info");
                }
            } catch (error) {
                handleError();
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimeInfo();
    }, [urlLocation]);

    useEffect(() => {

        // Set Episode Source to last episode after fetching show details
        const fetchEpisodeSource = async () => {
            try {
                setIsLoading(true);
                setCurrentEpisode(totalEpisodes[0].id)
            } catch (error) {
                handleError()
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (totalEpisodes) fetchEpisodeSource();
    }, [totalEpisodes]);

    useEffect(() => {

        // Fetches Episode Links
        const fetchEpisodeSource = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "https://api.consumet.org/anime/gogoanime/watch/" + currentEpisode
                );
                if (response.ok) {
                    const data = await response.json();
                    setCurrentEpisodeSource(data.sources.reverse());
                } else {
                    handleError()
                    throw new Error("Failed to fetch episode source");
                }
            } catch (error) {
                handleError()
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentEpisode) fetchEpisodeSource();
    }, [currentEpisode]);

    return (
        <>
            {isError ?
                // Error Banner Start
                <h1 className='text-white text-center p-5'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                // Error Banner End

                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        {/* Main Video Player Start */}
                        <div className="video-container">
                            {currentEpisodeSource && totalEpisodes && (
                                <Player
                                    src={currentEpisodeSource
                                        .filter(
                                            (element) =>
                                                element.quality !== "backup"
                                        )
                                        .map((element) => ({
                                            quality: element.quality,
                                            url: element.url,
                                        }))} dimensions={{ width: "100%", height: "100%" }} keyboardShortcut={false} >

                                    {(ref, props) => (
                                        <ReactHlsPlayer playerRef={ref} {...props} />
                                    )}
                                </Player>
                            )}
                        </div>
                        {/* Main Video Player End */}

                        {/* Episodes Section Start */}
                        <section className="latest-episodes">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2 className="block-title">Episodes</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {totalEpisodes &&
                                        totalEpisodes
                                            .map((element) => (
                                                <EpisodeCard
                                                    url={element.id}
                                                    episodeNumber={`Episode ${element.number}`}
                                                    isActive={currentEpisode === element.id}
                                                    changeEpisode={setCurrentEpisode}
                                                />
                                            ))}
                                </div>
                            </div>
                        </section>
                        {/* Episodes Section End */}

                        {/* Information and Suggestion Start */}
                        <AnimeInfoCard playButton={false} />
                        {/* Information and Suggestion End */}
                    </>
                )}
        </>
    );
}
