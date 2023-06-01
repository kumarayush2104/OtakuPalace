// Libraries
import React from 'react'
import { Link } from 'react-router-dom'

export default function AnimeNonCarouselCard(props) {
    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
            <div className="video-block">

                {/* Image Section Start */}
                <div className="video-thumb position-relative thumb-overlay">
                    <img alt={props.title} className="img-fluid" src={props.image} />

                    {/* Explorable Icon Start */}
                    <div className="box-content">
                        <ul className="icon">
                            <li>
                                <Link to={`/View/${props.id}`}><i className="fas fa-play"></i></Link>
                            </li>
                            <li>
                                <Link to={`/Info/${props.id}`}><i className="fas fa-info"></i></Link>
                            </li>
                        </ul>
                    </div>
                    {/* Explorable Icon End */}

                </div>
                {/* Image Section End */}

                {/* Video Details Start */}
                <div className="video-content">
                    <h2 className="video-title"><Link to={`/Info/${props.id}`}>{props.title}</Link></h2>
                    <p className="video-year text-center">{props.releaseYear}</p>
                    <div className="video-info d-flex flex-wrap">
                        {props.genres.map((element) => <span className="video-type m-1">{element}</span>)}
                    </div>
                </div>
                {/* Video Details End */}
            </div>
        </div>
    )
}
