// Libraries
import React from 'react'
import { Link } from 'react-router-dom'

function AnimeCarouselCard(props) {
    return (
        <div className="video-block">
            <div className="video-thumb position-relative thumb-overlay">

                {/* Image Section Start */}
                <img alt={props.title} className="img-fluid" src={props.image} />

                {/* Explorable Icon Start */}
                {props.explorable ? <div className="box-content">
                    <ul className="icon">
                        <li>
                            <Link to={`/View/${props.id}`}><i className="fas fa-play"></i></Link>
                        </li>
                        <li>
                            <Link to={`/Info/${props.id}`}><i className="fas fa-info"></i></Link>
                        </li>
                    </ul>
                </div> : ""}
                {/* Explorable Icon End */}

            </div>
            {/* Image Section End */}

            {/* Video Details Start */}
            <div className="video-content">
                <h6 className="video-title m-1">
                    {props.explorable ? <Link to={`/Info/${props.id}`}>{props.title}</Link> : props.title}
                </h6>
                {props.episode ? (
                    <p className="video-info text-center">{`Episode ${props.episode}`}</p>
                ) : props.genres ? <div className="video-info d-flex align-items-center flex-wrap">
                    {props.genres.map((element) => <span className="video-type m-1">{element}</span>)}
                </div> : null}
            </div>
            {/* Video Details End */}
            
        </div >
    )
}

export default AnimeCarouselCard
