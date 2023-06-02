// Libraries
import React from 'react'
import { Link } from 'react-router-dom'

export default function TopAnimeCardMobile(props) {
    return (
        <section className="play-details p-3">
            <div className="container p-lg-5 p-2">
                <span className="badge bg-warning text-dark">Trending Now</span>
                <div className="row align-items-center justify-content-center">
                    {/* Image Section Start */}
                    <div className="col-md-3 col-5">
                        <div className="col-md-12 text-center">
                            {/* Trending Now Banner Start */}

                            {/* Trending Now Banner End */}
                            <div className="play-thumb my-2">
                                <img className="img-fluid" src={props.image} alt={props.title} />
                            </div>
                        </div>
                    </div>
                    {/* Image Section End */}

                    <div className="col-md-9 col-8">
                        <div className="play-details-content">
                            {/* Information Section Start */}
                            <div className="title-block text-center my-3">
                                <h3 className="play-title-mobile">{props.title}</h3>
                            </div>
                            <div className="movie-persons">
                                <div className="person-block">
                                    <h5 className="title m-1">Genre</h5>
                                    <p className='d-flex flex-wrap col-7'>
                                        {props.genres.map((element) => (
                                            <span key={element} className="m-1">
                                                {element}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            {/* Information Section End */}

                            {/* Button Section Start */}
                            <div className="details-buttons">
                                <div className="row d-flex align-items-center">
                                    <div className="col-12 col-xl mb-xl-0 mb-3">
                                        <Link to={`/View/${props.id}`} className="btn d-block hvr-sweep-to-right" tabIndex="0">
                                            <i className="icofont-ui-play mr-2" aria-hidden="true"></i>Play
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* Button Section End */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
