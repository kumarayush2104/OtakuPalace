// Libraries
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Components
import AnimeCard from './AnimeCard';
import LoadingAnimation from './LoadingAnimation';
import { Link, useLocation } from 'react-router-dom';

export default function CategoryCarouselCard(props) {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/" + props.link);
                if (response.ok) {
                    const data = await response.json();
                    setAnimeList(data.results);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (props.data) {
            setAnimeList(props.data)
            setLoading(false)
        } else {
            fetchData();
        }
    }, [props.link]);

    return (
        <section className="carousel-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-between my-2">
                        <h2 className="block-title">{props.title}</h2>
                        <Link to={`/Category/${props.link}`} className="btn d-block view-more-button hvr-sweep-to-right" tabIndex="0">
                            View More
                        </Link>
                    </div>
                    {loading ? (
                        <LoadingAnimation />
                    ) : (
                        <OwlCarousel className="owl-carousel owl-theme owl-loaded owl-drag" {...CarouselOptions}>
                            {animeList.map((element) => (
                                <AnimeCard
                                    id={element.id}
                                    image={element.image}
                                    title={element.title.english ? element.title.english : element.title.userPreferred}
                                    genres={element.genres}
                                    episode={element.episodeNumber}
                                    key={element.id}
                                />
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </div>
        </section>
    );
}
