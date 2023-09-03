import {timeAgo} from "./DateCoverter";

function fetchPostsFromReddit(subreddit, postCount) {
    //const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;
    const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${postCount}`;

    return fetch(redditAPIUrl)
        .then(response => response.json())
        .then(data => {
            const posts = data.data.children.map(child => {
                const postData = child.data;
                //console.log(postData)
                return {
                    id: postData.id,
                    date: timeAgo(postData.created),
                    image: postData.url_overridden_by_dest,
                    link: `https://www.reddit.com${postData.permalink}`, // Use 'url' for non-media posts
                    source: postData.subreddit_name_prefixed,
                    title: postData.title,
                };
            });
            return posts;
        })
        .catch(error => {
            console.error('Error fetching data from Reddit API:', error);
        });

}
export {fetchPostsFromReddit};




