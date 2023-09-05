// src/components/RelatedVideos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmbeddedVideo from "../components/EmbeddedVideo";

const RelatedVideos = ({ query }) => {
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
        // Make the API request to search for videos based on the query
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: process.env.REACT_APP_YOUTUBE_KEY,
                part: 'snippet',
                maxResults: 3, // Adjust the number of results as needed
                q: query,     // The search query
                type: 'video',
            },
        })
            .then((response) => {
                setRelatedVideos(response.data.items);
            })
            .catch((error) => {
                console.error('Error fetching related videos:', error);
            });
    }, [query]);

    return (
        <div>
            <div className="">
                {relatedVideos.map((video) => (
                    <div key={video.id.videoId} className="video-embed">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            frameborder="0"
                            allowfullscreen
                            title={`Embedded Video ${video.id.videoId}`}
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedVideos;
