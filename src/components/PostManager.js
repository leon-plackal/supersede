import {fetchPostsFromReddit} from '../services/redditAPI'
import fetchNewsArticles from "../services/newsAPI";
import RelatedVideos from "../services/YoutubeAPI";
import ArticleGenerator from "../services/openAPI";
import {Articles, generalInterests, Subreddits, YouTubeQueries} from "./sampleInterests";

async function fetchPostsFromSources() {
    let numberOfPostsToFetch = 0;
    let allPosts = []; // Initialize allPosts as an empty array

    try {
        // REDDIT
        for (const { subreddit, interestLevel } of Subreddits) {
            // Calculate the number of posts to fetch based on interestLevel
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const postsFromReddit = await fetchPostsFromReddit(subreddit, numberOfPostsToFetch, true);
            if (postsFromReddit){
                allPosts = allPosts.concat(postsFromReddit); // Concatenate the arrays
            }
        }
        // YOUTUBE
        for (const { query, interestLevel } of YouTubeQueries) {
            let videoIds = [];
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            videoIds = await RelatedVideos(query, false);

            if (videoIds) {
                const youtubePosts = videoIds.map((video) => ({
                    YouTubeID: video.videoId,
                    title: video.title,
                    date: video.postedDate,
                    channel: video.channelName,
                    sourceType: 'youtube',
                }));
                allPosts = allPosts.concat(youtubePosts);
            }
        }
        // NEWSAPI
        for (const { newsInterest, interestLevel } of Articles) {
            let articles = [];
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            articles = await fetchNewsArticles(newsInterest, true);
            if (articles){
                allPosts = allPosts.concat(articles);
            }
        }

        //OPEN AI API
        for (const { interest } of generalInterests) {
            let articles = [];
            articles = await ArticleGenerator(interest, true);
            if (articles){
                allPosts = allPosts.concat(articles);
            }
        }

        allPosts = shuffleArray(allPosts);
        //console.log(allPosts)
        // Store posts in local storage with a timestamp.
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
        localStorage.setItem('cachedPosts', JSON.stringify({ posts: allPosts, expirationTime }));

        // Initialize the seen posts list (empty initially).
        const seenPosts = [];
        localStorage.setItem('seenPosts', JSON.stringify(seenPosts));
        return allPosts;

    } catch (error) {
        console.error('Error fetching posts PM:', error);
        return []; // Return an empty array on error.
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function calculateNumberOfPostsToFetch(interestLevel) {
    if (interestLevel >= 8 && interestLevel <= 10) {
        return 10; // High interest range
    } else if (interestLevel >= 4 && interestLevel <= 7) {
        return 5; // Moderate interest range
    } else if (interestLevel >= 1 && interestLevel <= 3) {
        return 2; // Low interest range
    } else {
        return 0; // Default or out-of-range value
    }
}

async function getCachedPosts() {
    const cachedData = localStorage.getItem('cachedPosts');
    if (cachedData) {
        const { posts, expirationTime } = JSON.parse(cachedData);
        if (expirationTime > new Date().getTime()) {
            return posts;
        }
    }
    return null; // Cache is expired or not available
}

async function fetchPostsFromSourcesAndCache() {
    const cachedPosts = await getCachedPosts();

    if (cachedPosts) {
        return cachedPosts;
    } else {
        return await fetchPostsFromSources();
    }
}

export { fetchPostsFromSources, fetchPostsFromSourcesAndCache };

