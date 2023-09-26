import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoProps {
    [key: string]: any;
}

const Video: React.FC<VideoProps> = (props) => {
    const videoNode = useRef<HTMLVideoElement | null>(null);
    // @ts-ignore
    const [player, setPlayer] = useState<videojs.Player | null>(null);

    useEffect(() => {
        // Create a Video.js player instance
        if (videoNode.current) {
            const _player = videojs(videoNode.current, props);
            setPlayer(_player);

            // Dispose the player when the component is unmounted
            return () => {
                // if (player !== null) {
                //     //player.dispose();
                // }
            };
        }
    }, [props]);

    return (
        <div data-vjs-player>
            <video ref={videoNode} className="video-js"></video>
        </div>
    );
};

const ConvertedVideo = ( HLSurl: String ) => {
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
};

export default ConvertedVideo;
