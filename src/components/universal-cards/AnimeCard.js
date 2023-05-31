import React from 'react'
import { Link } from 'react-router-dom'

function AnimeCard(props) {
    return (
        <div class="video-block">
            <div class="video-thumb position-relative thumb-overlay">
                <img alt={props.title} class="img-fluid" src={props.image} />
                <div class="box-content">
                    <ul class="icon">
                        <li>
                            <Link to={`/View/${props.id}`}><i class="fas fa-play"></i></Link>
                        </li>
                        <li>
                            <Link to={`/Info/${props.id}`}><i class="fas fa-info"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="video-content">
                <h6 class="video-title m-1"><Link to={`/Info/${props.id}`}>{props.title}</Link></h6>
                {props.episode ? (
                    <p class="video-info text-center">{`Episode ${props.episode}`}</p>
                ) : props.genres ? <div class="video-info d-flex align-items-center flex-wrap">
                    {props.genres.map((element) => <span class="video-type m-1">{element}</span>)}
                </div> : null}
            </div>
        </div >
    )
}

export default AnimeCard
