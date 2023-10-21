import uuid from '../utilities/uuid';

async function RelatedVideos(query: string, videoCount:number): Promise<any[]> {

    console.log("Calling Youtube API...", query, videoCount);
    try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/youtubevideos?query=${query}&amount=${videoCount}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const videoArray: VideoInfo[] = data.items.map((item: any) => ({
            id: uuid(),
            videoId: item.id.videoId,
            title: item.snippet.title,
            date: item.snippet.publishedAt,
            channelName: item.snippet.channelTitle,
            sourceType: 'youtube',
        }));

        return videoArray;
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
