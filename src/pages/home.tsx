import BaseLayout from "../components/BaseLayout";
import { useEffect, useState } from "react";
import { fetchPostsFromSourcesAndCache, clearCache } from '../services/PostManager';
import FeedCard from "../components/cards/FeedCard";
import React from "react";
import { useAuth } from "../supabase/Auth";
import LoaderSquare from "../components/LoaderSquare";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [showAllSeenNotification, setShowAllSeenNotification] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state
    const [loadFailed, setLoadFailed] = useState<boolean>(false); // Add a failed Load state
    const { user } = useAuth();

    const handleRefresh = async () => {
        // Clear the cache for 'cached posts'
        clearCache();
        // Reload the page
        window.location.reload();
    };
    useEffect(() => {
        async function loadPosts() {
            if(user)
            try {
                // Fetch posts from sources and cache them
                const allPosts = await fetchPostsFromSourcesAndCache(user);
                if (allPosts.length === 0) {
                    setLoadFailed(true)
                    setIsLoading(false)
                    return
                }
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
                setIsLoading(false); // Set loading state to false once posts are loaded
            } catch (error) {
                // Handle error
                console.error('Error loading posts:', error);
            }
        }

        loadPosts();
    }, []);

    return (
        <BaseLayout hideNav={false}>
            {showAllSeenNotification && (
                <div className="flex flex-col justify-center items-center ">
                    <div className="text-xl font-semibold">All caught up for today...</div>
                    <p className="mt-4 text-sm w-3/4 text-center">Come back tomorrow for more posts! You are limited to 50 posts a day. Don't go opening Reddit now...</p>
                </div>
            )}
            {loadFailed && (
                <div className="flex flex-col justify-center items-center">
                    <div className="text-xl font-semibold">Internal Server Error: Failed to load posts</div>
                    <p className="mt-4 text-sm w-2/4 text-center">We may be experiencing some server issues. Try refreshing the page.</p>
                    <button onClick={handleRefresh} className=" bg-blue-600 dark:bg-blue-800 p-1 px-2 rounded-sm font-normal text-white text-sm mt-4">
                        Refresh
                    </button>
                </div>
            )}
            {isLoading ? ( // Conditionally render a loader while loading
                <div className="flex justify-center items-center h-96 flex-col gap-2"><LoaderSquare message="Loading your posts..."/></div>
            ) : (
                <div>{posts.map((post) => {
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
                                        sourceType={post.sourceType}
                                    />
                                ) : post.sourceType === 'youtube' ? (
                                    <FeedCard
                                        postID={post.id}
                                        videoId={post.videoId}
                                        title={post.title}
                                        date={post.date}
                                        sourceName={post.channelName}
                                        sourceType={post.sourceType}
                                    />
                                ) : post.sourceType === 'news_article' ? (
                                    <FeedCard
                                        postID={post.id}
                                        title={post.title}
                                        description={post.description}
                                        imageUrl={post.imageUrl}
                                        url={post.url}
                                        date={post.date}
                                        sourceName={post.sourceName}
                                        sourceType={post.sourceType}
                                    />
                                ) : (
                                    <FeedCard
                                        postID={post.id}
                                        title={post.topic}
                                        description={post.article}
                                        date="Now"
                                        sourceName="GPT"
                                        sourceType={post.sourceType}
                                    />
                                )}
                            </div>
                        );
                    } else {
                        return null; // You can replace with appropriate rendering when post is null
                    }
                })}</div>
            )}

        </BaseLayout>
    )
}
