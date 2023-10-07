import { timeAgo } from "../utilities/DateCoverter";
import uuid from '../utilities/uuid';

async function fetchPostsFromReddit(subreddit: string, postCount: number) {

        console.log("Calling Reddit API...")
        try {
            const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${postCount}`;
            // Top post API: const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;

            const response = await fetch(redditAPIUrl);
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
            let message;
            if (error instanceof Error) message = error.message
            else message = String(error)
            console.error('Error fetching data from Reddit API:', message);
            reportError({message})
            throw error; // Re-throw the error for further handling or logging
        }
    }




export { fetchPostsFromReddit };
