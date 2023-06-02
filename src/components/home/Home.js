// Libraries
import React, { useEffect, useState } from 'react'

// Components
import CategoryCarouselCard from '../common/CategoryCarouselCard';
import AnimeByGenre from './AnimeByGenre';
import TopAnimeSection from './TopAnimeSection';

export default function Home() {

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        // Checks if Screen width is less than 767 (Small Screen) or more (Large Screen)
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 767);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <>
            {/* Top Anime Section  */}
            <TopAnimeSection largeScreen={isLargeScreen} />

            {/* Recently Added Episodes Section  */}
            <CategoryCarouselCard title={"Recently Added"} link={"recent-episodes"} viewMoreButton={true} />

            {/* Minimal Anime By Genre Section  */}
            <AnimeByGenre />

            {/* Upcoming Anime Section */}
            <CategoryCarouselCard title={"Upcoming Anime"} link={"advanced-search?status=NOT_YET_RELEASED&perPage=10"} viewMoreButton={true} />
        </>
    )
}
