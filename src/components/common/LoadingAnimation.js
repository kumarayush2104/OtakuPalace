// Libraries
import React from 'react'

// Media
import LoadingAnimationImage from '../../assets/loading.gif'

export default function LoadingAnimation() {
    return (
        <div className='text-center'>
            <img width="15%" src={LoadingAnimationImage} alt="Loading Animation" />
        </div>
    )
}
