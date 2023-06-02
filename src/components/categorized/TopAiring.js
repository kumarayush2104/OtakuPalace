// Libraries
import React, { useEffect, useState } from 'react'

// Components
import LoadingAnimation from '../common/LoadingAnimation'
import AnimeNonCarouselCard from '../common/AnimeNonCarouselCard'

export default function TopAiring() {

    const [animeList, setAnimeList] = useState(null)
    const [isError, setError] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    const handleError = () => setError(true)

    const handlePage = (hasPage) => setHasNextPage(hasPage)

    useEffect(() => {
        // Scroll to top on page navigation
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // Fetches Trending anime and their data
        const fetchData = async () => {
            setAnimeList(null)
            try {
                const response = await fetch("https://api.consumet.org/meta/anilist/trending?perPage=18&page=" + pageNumber);
                if (response.ok) {
                    const data = await response.json();
                    handlePage(data.hasNextPage)
                    setAnimeList(data.results)
                } else {
                    handleError()
                }
            } catch {
                handleError()
            }
        }

        fetchData();
    }, [pageNumber])

    return (
        <section className="carousel-section">
            <div className="container">
                <div className="row">

                    {/* Title Section Start */}
                    <div className="col-lg-12 d-flex justify-content-between">
                        <h2 className="block-title">Top Airing</h2>
                    </div>
                    {/* Title Section End */}
                    
                    {/* Tab Content Start */}
                    <div className="tab-content">
                        <div className="tab-pane animated fadeInRight show active">
                            <div className="row">
                                {isError ? <h1 className='text-white text-center'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                                    animeList ?
                                        animeList.map((element) => <AnimeNonCarouselCard
                                            id={element.id}
                                            image={element.image}
                                            title={element.title.english ? element.title.english : element.title.romaji}
                                            genres={element.genres}
                                        />) : <LoadingAnimation />}
                            </div>
                        </div>
                    </div>
                    {/* Tab Content End */}

                </div>

                {/* Page Navigator Section Start */}
                <div className='d-flex justify-content-between my-2'>
                    {pageNumber > 1 ? <button className='page-nav-button' onClick={() => setPageNumber(pageNumber - 1)}>Previous Page</button> : <div />}
                    {hasNextPage ? <button className='page-nav-button' onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button> : <div />}
                </div>
                {/* Page Navigator Section End */}

            </div>
        </section>
    )
}
