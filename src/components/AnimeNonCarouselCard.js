import React from 'react'
import { Link } from 'react-router-dom'

export default function AnimeNonCarouselCard(props) {
    return (
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
            <div class="video-block">
                <div class="video-thumb position-relative thumb-overlay">
                    <img alt={props.title} class="img-fluid" src={props.image} />
                    <div class="box-content">
                        <ul className="icon">
                            <li>
                                <Link to={`/View/${props.id}`}><i className="fas fa-play"></i></Link>
                            </li>
                            <li>
                                <Link to={`/Info/${props.id}`}><i className="fas fa-info"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="video-content">
                    <h2 class="video-title"><Link to={`/Info/${props.id}`}>{props.title}</Link></h2>
                    <p class="video-year text-center">{props.releaseYear}</p>
                    <div class="video-info d-flex flex-wrap">
                        {props.genres.map((element) => <span className="video-type m-1">{element}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
