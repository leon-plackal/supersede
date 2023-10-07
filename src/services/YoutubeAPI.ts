import axios from 'axios';
import uuid from '../utilities/uuid';

async function RelatedVideos(query: string): Promise<any[]> {

        console.log("Calling Youtube API...");
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: import.meta.env.VITE_YOUTUBE_KEY,
                    part: 'snippet',
                    maxResults: 1,
                    q: query,
                    type: 'video',
                },
            });

            // Extract and return an array of video IDs from the response
            // @ts-ignore
            const videoIds: VideoInfo[] = response.data.items.map((item) => ({
                id: uuid(),
                videoId: item.id.videoId,
                title: item.snippet.title,
                date: item.snippet.publishedAt,
                channelName: item.snippet.channelTitle,
                sourceType: 'youtube',
            }));

            return videoIds;
        } catch (error) {
            console.error('Error fetching related videos:', error);
            return []; // Return an empty array in case of an error
        }
}

export default RelatedVideos;

interface VideoInfo {
    id: string;
    videoId: string;
    title: string;
    postedDate: string;
    channelName: string;
}
