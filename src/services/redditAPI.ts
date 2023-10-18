import { timeAgo } from "../utilities/DateCoverter";
import uuid from '../utilities/uuid';

async function fetchPostsFromReddit(subreddit: string, postCount: number) {

    console.log("Calling Reddit API...")
    try {
        const response = await fetch(`http://localhost:3001/redditposts?subreddit=${subreddit}&postCount=${postCount}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const posts = data.data.children.map((child: any) => {
            const postData = child.data;

            let videoUrl;

            if (postData.is_video) {
                videoUrl = postData.secure_media.reddit_video.hls_url;
            }

            return {
                id: uuid(),
                videoURL: videoUrl,
                date: timeAgo(postData.created),
                image: postData.url_overridden_by_dest,
                link: `https://www.reddit.com${postData.permalink}`, // Use 'url' for non-media posts
                source: postData.subreddit_name_prefixed,
                title: postData.title,
                sourceType: 'reddit',
            };
        });
        return posts;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array on error
    }
}




export { fetchPostsFromReddit };
