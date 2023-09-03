
function fetchPostsFromReddit(subreddit, postCount) {
    const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;

    return fetch(redditAPIUrl)
        .then(response => response.json())
        .then(data => {
            const posts = data.data.children.map(child => {
                const postData = child.data;
                return {
                    title: postData.title,
                    image: postData.url_overridden_by_dest, // Use 'url' for non-media posts
                    link: `https://www.reddit.com${postData.permalink}`
                };
            });
            return posts;
        });
}

async function fetchPostsFromSources() {
    try {
        const subreddit = 'memes';
        const postCount = 5;

        const postsFromSource1 = await fetchPostsFromReddit(subreddit, postCount);
        // Now, you have the Reddit posts in the 'postsFromSource1' variable
        console.log(postsFromSource1);

        // Combine posts from different sources into a single array.
        const allPosts = [...postsFromSource1];

        // Store posts in local storage with a timestamp.
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
        localStorage.setItem('cachedPosts', JSON.stringify({ posts: allPosts, expirationTime }));

        // Initialize the seen posts list (empty initially).
        const seenPosts = [];
        localStorage.setItem('seenPosts', JSON.stringify(seenPosts));

        return allPosts;
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
    let posts = [];

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

