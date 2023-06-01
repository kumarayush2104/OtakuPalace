// Libraries
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';

// Components
import AnimeCarouselCard from './AnimeCarouselCard';
import LoadingAnimation from './LoadingAnimation';

export default function CategoryCarouselCard(props) {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const animeId = useLocation();

    const CarouselOptions = {
        loop: true,
        margin: 30,
        autoplay: true,
        items: 7,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    };

    const toggleError = () => {
        setError(!isError)
    }

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/" + props.link);
                if (response.ok) {
                    const data = await response.json();
                    setAnimeList(data.results);
                } else {
                    toggleError()
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                toggleError();
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (props.data) {
            setAnimeList(props.data);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [animeId, props.data, props.link]);

    return (
        <section className="carousel-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-between">
                        <h2 className="block-title">{props.title}</h2>
                    </div>
                    {loading ? (
                        <LoadingAnimation />
                    ) : isError ? <h1 className='text-white text-center'><i class="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> : (
                        <OwlCarousel className="owl-carousel owl-theme owl-loaded owl-drag my-4" {...CarouselOptions}>
                            {animeList.map((element) => (
                                <AnimeCarouselCard
                                    id={element.id}
                                    image={element.image}
                                    title={element.title.english ? element.title.english : element.title.userPreferred}
                                    genres={element.genres}
                                    episode={element.episodeNumber}
                                    key={element.id}
                                    explorable={element.currentEpisode > 0 || element.episodeNumber || element.status == "Ongoing" || element.status === "Completed"}
                                />
                            ))}
                        </OwlCarousel>
                    )}
                </div>
                {props.viewMoreButton && !isError ? (
                    <Link to={`/Category/${props.link}`} className="btn d-block view-more-button hvr-sweep-to-right" tabIndex="0">
                        View More
                    </Link>
                ) : null}
            </div>
        </section>
    );
}
