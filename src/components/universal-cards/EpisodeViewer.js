// Libraries
import React, { useEffect, useState } from 'react';
import { Player } from 'react-tuby';
import "react-tuby/css/main.css";
import ReactHlsPlayer from '@ducanh2912/react-hls-player';

// Components
import LoadingAnimation from './LoadingAnimation';
import AnimeInfoCard from './AnimeInfoCard';
import EpisodeCard from './EpisodeCard';
import { useLocation } from 'react-router-dom';

export default function EpisodeViewer() {
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [currentEpisodeSource, setCurrentEpisodeSource] = useState(null);
    const [totalEpisodes, setTotalEpisodes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const urlLocation = useLocation();

    useEffect(() => {
        const fetchAnimeInfo = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "https://api.consumet.org/meta/anilist/info/" +
                    window.location.pathname.split("/")[2]
                );
                if (response.ok) {
                    const data = await response.json();
                    setTotalEpisodes(data.episodes);
                } else {
                    throw new Error("Failed to fetch anime info");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimeInfo();
    }, [urlLocation]);

    useEffect(() => {
        const fetchEpisodeSource = async () => {
            try {
                setIsLoading(true);
                setCurrentEpisode(totalEpisodes[0].id)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEpisodeSource();
    }, [totalEpisodes]);

    useEffect(() => {
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
                    throw new Error("Failed to fetch episode source");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEpisodeSource();
    }, [currentEpisode]);

    return (
        <>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <>
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
                                    <ReactHlsPlayer playerRef={ref} {...props} autoPlay />
                                )}
                            </Player>
                        )}
                    </div>
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
                                                episodeNumber={element.number}
                                                isActive={currentEpisode === element.id}
                                                changeEpisode={setCurrentEpisode}
                                            />
                                        ))
                                }
                            </div>
                        </div>
                    </section>

                    <AnimeInfoCard playButton={false} />
                </>
            )}
        </>
    );
}
