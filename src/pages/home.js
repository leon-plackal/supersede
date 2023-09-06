import BaseLayout from "../components/BaseLayout";
import {useEffect, useState} from "react";
import {fetchPostsFromSources} from '../components/PostManager'
import FeedCard from "../components/cards/FeedCard";
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
            <div id='sample-key-div'>
            <FeedCard
                title="Sample"
                description='big chuggy thnanossa'
                imageUrl={"https://i.redd.it/exmpxrh2akmb1.jpg"}
                date='Now'
                sourceName='Sample'
            />
            <FeedCard
                title="Sample"
                description='https://unsplash.com/photos/a-person-standing-in-a-field-with-mountains-in-the-background-VXBc3QP_ek4'
                url='https://unsplash.com/photos/a-person-standing-in-a-field-with-mountains-in-the-background-VXBc3QP_ek4'
                date='Now'
                sourceName='Sample'
                videoId='A6g8xc0MoiY'
            />
            <FeedCard
                title="Sample"
                description='big chuggy thnanossa'
                imageUrl={"https://i.redd.it/exmpxrh2akmb1.jpg"}
                date='Now'
                sourceName='Sample'
            />
            </div>
            {posts.map((post) => {
                if (post){
                    return (
                        <div key={post.id} id='feed-key-div'>
                            {post.sourceType === 'reddit' ? (
                                <FeedCard

                                    videoClip={post.video}
                                    title={post.title}
                                    imageUrl={post.image}
                                    url={post.link}
                                    date={post.date}
                                    sourceName={post.source}
                                />
                            ) : post.sourceType === 'youtube' ? (
                                <FeedCard

                                    videoId={post.YouTubeID}
                                    title={post.title}
                                    date={post.date}
                                    sourceName={post.channel}
                                />
                            ) : post.sourceType === 'newsArticle' ? (
                                <FeedCard

                                    title={post.title}
                                    description={post.description}
                                    imageUrl={post.imageUrl}
                                    url={post.url}
                                    publishedAt={post.publishedAt}
                                    sourceName={post.sourceName}
                                />
                            ) : (
                                <FeedCard

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