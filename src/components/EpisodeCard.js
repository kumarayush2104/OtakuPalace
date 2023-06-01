// Libraries
import React from 'react';

export default function EpisodeCard(props) {
    return (
         <div className="col-6 col-sm-6 col-md-3 col-lg-5 col-xl-2 my-2">
            <div className={`episode-block ${props.isActive ? "active" : ""}`} onClick={() => props.changeEpisode(props.url)}>
                {props.episodeNumber}
            </div>
        </div>
    );
}
