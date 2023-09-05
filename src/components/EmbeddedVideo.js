// src/components/EmbeddedVideo.js
import React from 'react';

const EmbeddedVideo = ({ query }) => {
    return (
        <div className="embedded-video">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${query}`}
                frameborder="0"
                allowfullscreen
                title={`Embedded Video ${query}`}
            ></iframe>
        </div>
    );
};

export default EmbeddedVideo;
