import PostCard from "../components/PostCard";
import BaseLayout from "../components/BaseLayout";
import {useEffect, useState} from "react";
import {fetchPostsFromSources} from '../components/PostLoader'

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
            {posts.map((post) => (
                <PostCard
                    key={post.id} // Ensure you have a unique key for each Card
                    title={post.title}
                    image={post.image}
                    link={post.link}
                    date={post.date}
                    Source={post.source}
                />
            ))}
        </BaseLayout>
    )
}