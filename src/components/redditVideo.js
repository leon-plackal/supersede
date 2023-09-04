import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

/**
 * Video component that initializes a Video.js player.
 * @param {Object} props - Props for configuring the video player.
 * @returns {JSX.Element} - Returns a Video.js player wrapped in a React component.
 */
const Video = (props) => {
    const videoNode = useRef(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // Create a Video.js player instance
        if (videoNode.current) {
            const _player = videojs(videoNode.current, props);
            setPlayer(_player);

            // Dispose the player when the component is unmounted
            return () => {
                if (player !== null) {
                    player.dispose();
                }
            };
        }
    }, [props]);

    return (
        <div data-vjs-player>
            <video ref={videoNode} className="video-js"></video>
        </div>
    );
};

/**
 * ConvertedVideo component that displays a Video.js player with an HLS stream.
 * @param {string} HLSurl - URL of the HLS stream.
 * @returns {JSX.Element} - Returns a React component for displaying the HLS stream.
 */
export default function ConvertedVideo(HLSurl) {
    const play = {
        fill: true,
        fluid: true,
        autoplay: false,
        controls: true,
        preload: "metadata",
        sources: [
            {
                src: `${HLSurl}`,
                type: "application/x-mpegURL",
            },
        ],
    };

    return (
        <div className="App">
            <Video {...play} />
        </div>
    );
}
