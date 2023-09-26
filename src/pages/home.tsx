import BaseLayout from "../components/BaseLayout";
import { useEffect, useState } from "react";
import { fetchPostsFromSourcesAndCache } from '../services/PostManager';
import FeedCard from "../components/cards/FeedCard";
import React from "react";

export default function Home() {
    // TODO: when API call fails, continue others else display message that posts failed to load
    const [posts, setPosts] = useState<any[]>([]); // You can replace 'any[]' with the actual type of your posts
    const [showAllSeenNotification, setShowAllSeenNotification] = useState<boolean>(false);

    useEffect(() => {
        async function loadPosts() {
            try {
                const allPosts = await fetchPostsFromSourcesAndCache();
                const seenPostsJSON = localStorage.getItem('seenPosts');
                const seenPosts = seenPostsJSON ? JSON.parse(seenPostsJSON) : [];
                const unseenPosts = allPosts.filter(post => !seenPosts.includes(post.id)); // Assuming each post has a unique identifier like 'id'
                // Check if unseenPosts is empty
                if (unseenPosts.length === 0) {
                    setShowAllSeenNotification(true);
                } else {
                    setShowAllSeenNotification(false);
                }

                setPosts(unseenPosts);
            } catch (error) {
                // Handle any errors here
                console.error('Error loading posts:', error);
            }
        }

        loadPosts();
    }, []);

    return (
        <BaseLayout hideNav={false}>
            {showAllSeenNotification && (
                <div className="all-posts-seen-notification flex justify-center text-xl font-semibold">
                    All caught up for today!
                </div>
            )}

            {posts.map((post) => {
                if (post) {
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
                                    videoId={post.videoId}
                                    title={post.title}
                                    date={post.date}
                                    sourceName={post.channelName}
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
                } else {
                    return null; // You can replace with appropriate rendering when post is null
                }
            })}
        </BaseLayout>
    )
}
