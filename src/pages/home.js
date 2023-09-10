import BaseLayout from "../components/BaseLayout";
import {useEffect, useState} from "react";
import {fetchPostsFromSourcesAndCache} from '../components/PostManager'
import FeedCard from "../components/cards/FeedCard";
import ConvertedVideo from "../components/redditVideo";

export default function Home() {
    //TODO: when API call fails, continue others else display message that posts failed to load
    const [posts, setPosts] = useState([]);
    const [showAllSeenNotification, setShowAllSeenNotification] = useState(false);
    const video = ConvertedVideo("https://v.redd.it/xw54bsknrymb1/HLSPlaylist.m3u8?a=1696766141%2CNDkyY2RkNjllZTAxMDg1ZjIwNjRiMWZkNWE0NTg1MjMwMmY0MGE2ZTdlNTk3MTY5YzQ1NTU5NjcxNDY5MDMyYQ%3D%3D&amp;v=1&amp;f=sd")
    useEffect(() => {
        async function loadPosts() {
            const allPosts = await fetchPostsFromSourcesAndCache();
            const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || [];
            const unseenPosts = allPosts.filter(post => !seenPosts.includes(post.id)); // Assuming each post has a unique identifier like 'id'
            // Check if unseenPosts is empty
            if (unseenPosts.length === 0) {
                setShowAllSeenNotification(true);
            } else {
                setShowAllSeenNotification(false);
            }


            setPosts(unseenPosts);
        }

        loadPosts().catch(error => {
            // Handle any errors here
            console.error('Error loading posts:', error);
        });
    }, []);

    return (
        <BaseLayout>
            {showAllSeenNotification && (
                <div className="all-posts-seen-notification flex justify-center text-xl font-semibold">
                    All caught up for today!
                </div>
            )}

            {posts.map((post) => {
                if (post){
                    return (
                        <div key={post.id} id='feed-key-div'>
                            {post.sourceType === 'reddit' ? (
                                <FeedCard
                                    postID={post.id}
                                    videoURL={post.videoURL}
                                    title={post.title}
                                    imageUrl={post.image}
                                    url={post.link}
                                    date={post.date}
                                    sourceName={post.source}
                                />
                            ) : post.sourceType === 'youtube' ? (
                                <FeedCard
                                    postID={post.id}
                                    videoId={post.YouTubeID}
                                    title={post.title}
                                    date={post.date}
                                    sourceName={post.channel}
                                />
                            ) : post.sourceType === 'newsArticle' ? (
                                <FeedCard
                                    postID={post.id}
                                    title={post.title}
                                    description={post.description}
                                    imageUrl={post.imageUrl}
                                    url={post.url}
                                    publishedAt={post.publishedAt}
                                    sourceName={post.sourceName}
                                />
                            ) : (
                                <FeedCard
                                    postID={post.id}
                                    title={post.topic}
                                    description={post.article}
                                    publishedAt="Now"
                                    sourceName="GPT"
                                />
                            )}
                        </div>
                    );
                }else{
                    return (
                        <div></div>
                    )
                }

            })}
        </BaseLayout>
    )
}