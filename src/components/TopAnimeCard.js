// Libraries
import React from 'react'
import { Link } from 'react-router-dom'

export default function TopAnimeCard(props) {
    return (
        <div className="container-flex banner" style={{ backgroundImage: `url(${props.banner})` }}>
            <section className="play-details">
                <div className="container p-lg-5 p-2">
                    <div className="row align-items-center">

                        {/* Image Section Start */}
                        <div className="col-md-3">
                            <div className="col-md-12 text-center">
                                <div className="play-thumb">
                                    <img className="img-fluid" src={props.image} alt={props.title} />
                                </div>
                            </div>
                        </div>
                        {/* Image Section End */}

                        <div className="col-md-9">

                            {/* Trending Now Banner Start */}
                            <span className="badge bg-warning text-dark">Trending Now</span>
                            {/* Trending Now Banner End */}

                            <div className="play-details-content">

                                {/* Information Section Start */}
                                <div className="title-block d-flex align-items-center justify-content-between">
                                    <h3 className="play-title">{props.title}</h3>
                                </div>
                                <div className="movie-persons">
                                    <div className="person-block">
                                        <h5 className="title">Genre</h5>
                                        <p>
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
                                        <div className="col-6 col-xl mb-xl-0 mb-3">
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
        </div>
    )
}
