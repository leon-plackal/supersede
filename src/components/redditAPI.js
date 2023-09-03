const subreddit = 'memes';
const postCount = 5;

const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;

fetch(redditAPIUrl)
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

        // Display or process the retrieved posts
        console.log(posts);
    })
    .catch(error => {
        console.error('Error fetching data from Reddit API:', error);
    });