import PostCard from "../components/PostCard";
import BaseLayout from "../components/BaseLayout";
import {useEffect, useState} from "react";
import {fetchPostsFromSources} from '../components/PostManager'
import VideoCard from "../components/VideoCard";
export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Call the fetchPostsFromSources function to fetch posts
                const fetchedPosts = await fetchPostsFromSources();

                // Set the fetched posts in the component's state
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <BaseLayout>
            {posts.map((post) => {
                //console.log('Post ID:', post.id); // Log the post.id to check for duplicates
                return (
                    <div key={post.id} className="content-item">
                        {post.sourceType === 'reddit' ? (
                            <PostCard
                                video={post.video}
                                title={post.title}
                                image={post.image}
                                link={post.link}
                                date={post.date}
                                Source={post.source}
                            />
                        ) : (
                            <VideoCard
                                key={post.YouTubeID} // Ensure each VideoCard has a unique key
                                videoId={post.YouTubeID}
                                title={post.title}
                                date={post.date}
                                channelName={post.channel}
                            />
                        )}
                    </div>
                );
            })}
        </BaseLayout>
    )
}