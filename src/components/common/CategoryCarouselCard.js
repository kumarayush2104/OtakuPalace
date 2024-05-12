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
        loop: animeList.length > 4,
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


    // Handle errors
    const toggleError = () => {
        setError(true)
    }

    useEffect(() => {

        // Fetches Anime Information
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch("https://api.streamsora.live/meta/anilist/" + props.link);
                if (response.ok) {
                    const data = await response.json();
                    setAnimeList(data.results);
                } else {
                    toggleError()
                }
            } catch (error) {
                toggleError();
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        // Uses Data instead of Fetching if provided
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

                    {/* Title Section Start */}
                    <div className="col-lg-12 d-flex justify-content-between">
                        <h2 className="block-title">{props.title}</h2>
                    </div>
                    {/* Title Section End */}


                    {loading ? (
                        <LoadingAnimation />
                    ) : isError ?

                        // Error Banner Start
                        <h1 className='text-white text-center'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                        // Error Banner End

                        // Carousel Section Start
                        <OwlCarousel className="owl-carousel owl-theme owl-loaded owl-drag my-4" {...CarouselOptions}>
                            {animeList.map((element) => (
                                <AnimeCarouselCard
                                    id={element.id}
                                    image={element.image}
                                    title={element.title.english ? element.title.english : element.title.userPreferred}
                                    genres={element.genres}
                                    episode={element.episodeNumber}
                                    key={element.id}
                                    explorable={element.currentEpisode > 0 || element.episodeNumber || element.status === "Ongoing" || element.status === "Completed"}
                                />
                            ))}
                        </OwlCarousel>
                        // Carousel Section End

                    }
                </div>

                {/* View More Button Start */}
                {props.viewMorePath && !isError ? (
                    <Link to={`${props.viewMorePath}`} className="btn d-block view-more-button hvr-sweep-to-right" tabIndex="0">
                        View More
                    </Link>
                ) : null}
                {/* View More Button End */}
                
            </div>
        </section>
    );
}
