import React, { useEffect, useState } from 'react'
import AnimeCard from '../AnimeCard'
import LoadingAnimation from '../LoadingAnimation'

export default function TopAnime() {
    const [list, setList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.consumet.org/anime/gogoanime/top-airing");
                if (response.ok) {
                    const data = await response.json();
                    setList(data.results);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container-flex'>
            <div className='container'>
                <div className='row justify-content-start'>
                    {list && list.length > 0 ? (
                        list.map((element) => (
                            <AnimeCard id={element.id} image={element.image} title={element.title.length > 0 ? element.title : element.id} />
                        ))
                    ) : (
                        <LoadingAnimation />
                    )}
                </div>
            </div>
        </div>
    )
}
