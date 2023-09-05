import {fetchPostsFromReddit} from './redditAPI'
import RelatedVideos from "../services/YoutubeAPI";
import {Subreddits, YouTubeQueries} from "./sampleInterests";

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

async function fetchPostsFromSources() {
    let numberOfPostsToFetch = 0;

    try {
        let allPosts = []; // Initialize allPosts as an empty array

        for (const { subreddit, interestLevel } of Subreddits) {
            // Calculate the number of posts to fetch based on interestLevel
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const postsFromReddit = await fetchPostsFromReddit(subreddit, numberOfPostsToFetch);
            //console.log(postsFromReddit);
            allPosts = allPosts.concat(postsFromReddit); // Concatenate the arrays
        }
        for (const { searchQuery, interestLevel } of YouTubeQueries) {
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const postsFromYoutube = RelatedVideos(searchQuery)
            allPosts = allPosts.concat(postsFromYoutube);
        }

        allPosts = shuffleArray(allPosts);
        return allPosts;



        // Combine posts from different sources into a single array.

        // Store posts in local storage with a timestamp.
        // const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
        // localStorage.setItem('cachedPosts', JSON.stringify({ posts: allPosts, expirationTime }));
        //
        // // Initialize the seen posts list (empty initially).
        // const seenPosts = [];
        // localStorage.setItem('seenPosts', JSON.stringify(seenPosts));

    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return an empty array on error.
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

