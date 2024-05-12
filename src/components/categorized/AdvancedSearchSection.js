// Libraries
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

// Components
import LoadingAnimation from '../common/LoadingAnimation'
import AnimeNonCarouselCard from '../common/AnimeNonCarouselCard'

export default function AdvancedSearchSection() {

    const [animeList, setAnimeList] = useState(null)
    const [isError, setError] = useState(false)
    const [sortOption, setSortOption] = useState(null)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    // Filter Section
    const [genre, setGenre] = useState(null)
    const [year, setYear] = useState(null)

    const SiteTheme = {
        control: provided => ({
            ...provided,
            borderColor: 'red',
            borderRadius: '10px',
            boxShadow: 'red',
            color: 'white',
            backgroundColor: 'black',
        }),

        menu: provided => ({
            ...provided,
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
                backgroundColor: 'red',
            }
        }),

        singleValue: provided => ({
            ...provided,
            color: 'white'
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'red' : 'black',
            color: 'white',
            '&:hover': {
                backgroundColor: 'red',
            },
        }),

        input: provided => ({
            ...provided,
            color: 'white'
        }),
    };

    // Genre options
    const genreOptions = [
        { value: null, label: "All" },
        { value: "Action", label: "Action" },
        { value: "Adventure", label: "Adventure" },
        { value: "Comedy", label: "Comedy" },
        { value: "Drama", label: "Drama" },
        { value: "Echhi", label: "Echhi" },
        { value: "Fantasy", label: "Fantasy" },
        { value: "Horror", label: "Horror" },
        { value: "Mecha", label: "Mecha" },
        { value: "Music", label: "Music" },
        { value: "Mystery", label: "Mystery" },
        { value: "Psychological", label: "Psychological" },
        { value: "Romance", label: "Romance" },
        { value: "Sci-Fi", label: "Sci-Fi" },
        { value: "Slice of Life", label: "Slice of Life" },
        { value: "Sports", label: "Sports" },
        { value: "Supernatural", label: "Supernatural" },
        { value: "Thriller", label: "Thriller" },
    ]

    // Year Array
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, index) => {
        const year = 1990 + index;
        return { value: year, label: year.toString() };
    }).concat({ value: null, label: "All" }).reverse();

    // Sorting Options
    const sortingOptions = [
        { value: null, label: "All" },
        { value: "START_DATE", label: "Oldest" },
        { value: "START_DATE_DESC", label: "Newest" },
        { value: "SCORE", label: "Lowest Score" },
        { value: "SCORE_DESC", label: "Highest Score" },
    ]

    // Handles Error
    const handleError = () => setError(true)

    // Handles Page
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
                var url = "https://api.streamsora.live/meta/anilist/advanced-search?perPage=18&page=" + pageNumber;
                if (genre) url += "&genres=[%22" + genre + "%22]"
                if (year) url += "&year=" + year
                if (sortOption) url += "&sort=[%22" + sortOption + "%22]"

                const response = await fetch(url)

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
    }, [pageNumber, genre, year, sortOption])

    return (
        <section className="carousel-section">
            <div className="container">
                <div className="row">

                    {/* Title Section Start */}
                    <div className="col-lg-12 d-flex m-2">
                        <h2 className="block-title">Find Your Favorites</h2>
                    </div>
                    {/* Title Section End */}

                    <div className='filter-section col-lg-12 d-flex flex-wrap mb-5'>
                        <Select
                            className='col-2 m-2 genre-filter'
                            styles={SiteTheme}
                            options={genreOptions}
                            placeholder="Select a Genre"
                            onChange={(selectedOption) => setGenre(selectedOption.value)}
                        />

                        <Select
                            className='col-2 m-2 genre-filter'
                            styles={SiteTheme}
                            options={yearOptions}
                            placeholder="Select a Year"
                            onChange={(selectedOption) => setYear(selectedOption.value)}
                        />


                        <Select
                            className='col-2 m-2 genre-filter'
                            styles={SiteTheme}
                            options={sortingOptions}
                            placeholder="Sort"
                            onChange={(selectedOption) => setSortOption(selectedOption.value)}
                        />
                    </div>

                    {/* Tab Content Start */}
                    <div className="tab-content">
                        <div className="tab-pane animated fadeInRight show active">
                            <div className="row">
                                {isError ? <h1 className='text-white text-center'><i className="fa-solid fa-warning" style={{ color: "#FF0000" }} /> Failed to Fetch Data</h1> :
                                    animeList ?
                                        animeList.map((element) => <AnimeNonCarouselCard
                                            key={element.id}
                                            id={element.id}
                                            image={element.image}
                                            title={element.title.english ? element.title.english : element.title.romaji}
                                            genres={element.genres}
                                            episode={element.episodeNumber}
                                            explorable={element.currentEpisode > 0 || element.episodeNumber || element.status === "Ongoing" || element.status === "Completed"}
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
