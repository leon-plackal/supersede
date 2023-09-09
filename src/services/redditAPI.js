import {timeAgo} from "../components/DateCoverter";
import ConvertedVideo from '../components/redditVideo'
import uuid from "../components/cards/uuid";
/**
 * Fetches posts from a specified subreddit using the Reddit API.
 * @param {string} subreddit - The name of the subreddit to fetch posts from.
 * @param {number} postCount - The number of posts to fetch.
 * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of post objects.
 */
async function fetchPostsFromReddit(subreddit, postCount, callAPI) {
    if (callAPI) {
        console.log("Calling Reddit API...")
        try {
            const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${postCount}`;
            // Top post API: const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;

            const response = await fetch(redditAPIUrl);
            const data = await response.json();

            const posts = data.data.children.map((child) => {
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
            console.error('Error fetching data from Reddit API:', error.message);
            throw error; // Re-throw the error for further handling or logging
        }
    }
}

export { fetchPostsFromReddit };


