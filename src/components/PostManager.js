import {fetchPostsFromReddit} from '../services/redditAPI'
import fetchNewsArticles from "../services/newsAPI";
import RelatedVideos from "../services/YoutubeAPI";
import ArticleGenerator from "../services/openAPI";
import {Subreddits, YouTubeQueries, Articles, generalInterests} from "./sampleInterests";

async function fetchPostsFromSources() {
    let numberOfPostsToFetch = 0;
    let allPosts = []; // Initialize allPosts as an empty array

    try {
        // REDDIT
        for (const { subreddit, interestLevel } of Subreddits) {
            // Calculate the number of posts to fetch based on interestLevel
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const postsFromReddit = await fetchPostsFromReddit(subreddit, numberOfPostsToFetch, false);
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
            articles = await fetchNewsArticles(newsInterest, false);
            if (articles){
                allPosts = allPosts.concat(articles);
            }
        }

        //OPEN AI API
        for (const { interest } of generalInterests) {
            let articles = [];
            articles = await ArticleGenerator(interest, false);
            if (articles){
                allPosts = allPosts.concat(articles);
            }
        }

        allPosts = shuffleArray(allPosts);
        console.log(allPosts)
        // Store posts in local storage with a timestamp.
        // const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
        // localStorage.setItem('cachedPosts', JSON.stringify({ posts: allPosts, expirationTime }));
        //
        // // Initialize the seen posts list (empty initially).
        // const seenPosts = [];
        // localStorage.setItem('seenPosts', JSON.stringify(seenPosts));
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
function markPostAsSeen(postId) {
    const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || [];
    seenPosts.push(postId);
    localStorage.setItem('seenPosts', JSON.stringify(seenPosts));
}

// Function to check if a post has been seen
function isPostSeen(postId) {
    const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || [];
    return seenPosts.includes(postId);
}

async function loadAndDisplayPosts() {
    const cachedData = JSON.parse(localStorage.getItem('cachedPosts'));
    let posts;

    if (!cachedData || new Date().getTime() > cachedData.expirationTime) {
        // Cache is empty or has expired, fetch new posts.
        posts = await fetchPostsFromSources();
    } else {
        // Use cached posts.
        posts = cachedData.posts;
    }

    posts.forEach((post) => {
        if (isPostSeen(post.id)) {
            console.log(`Post with ID ${post.id} is seen.`);
        } else {
            console.log(`Post with ID ${post.id} is unseen.`);
            // Mark the post as seen when it becomes visible in the viewport or based on user interaction.
            // markPostAsSeen(post.id);
        }
    });
}

export { fetchPostsFromReddit, fetchPostsFromSources };

