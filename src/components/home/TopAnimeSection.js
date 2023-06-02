// Libraries
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactOwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Components
import LoadingAnimation from '../common/LoadingAnimation';
import TopAnimeCardMobile from './TopAnimeCardMobile';
import TopAnimeCard from './TopAnimeCard';

// Media
import AnimeBanner from '../../assets/AnimeBanner.jpg';

export default function TopAnimeSection(props) {

    const [isError, setError] = useState(false);
    const animeId = useLocation();
    const [animeList, setAnimeList] = useState(null);

    const CarouselOptions = {
        loop: true,
        autoplay: true,
        items: 1,
        dots: false,
    };

    // Handle Errors
    const handleError = () => setError(true);

    useEffect(() => {
        // Fetches Anime Information
        setAnimeList(null);
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/trending");
                if (response.ok) {
                    const data = await response.json();
                    setAnimeList(data.results);
                } else {
                    handleError();
                }
            } catch (error) {
                handleError();
                console.error(error);
            }
        };
        fetchData();
    }, [animeId, props.largeScreen]);

    return (
        <>
            {isError ?
                // Error Banner Start
                <h1 className='text-white text-center p-5'>Message From Top Banner: <br /><br /><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                // Error Banner End
                animeList ?
                    <div className="container-flex banner" style={{ backgroundImage: `url(${AnimeBanner})` }}>

                        {/* Carousel Section Start */}
                        <ReactOwlCarousel className="owl-carousel owl-theme owl-loaded owl-drag" {...CarouselOptions}>
                            {animeList.map((element) => props.largeScreen ?
                                // Default Anime Card
                                <TopAnimeCard
                                    id={element.id}
                                    image={element.image}
                                    description={element.description}
                                    genres={element.genres}
                                    title={element.title.english ? element.title.english : element.title.romaji} /> :

                                // Mobile Anime Card
                                <TopAnimeCardMobile
                                    id={element.id}
                                    image={element.image}
                                    description={element.description}
                                    genres={element.genres}
                                    title={element.title.english ? element.title.english : element.title.romaji} />)}
                        </ReactOwlCarousel>
                        {/* Carousel Section End */}

                    </div> : <LoadingAnimation />}

        </>
    )
}
