import BaseLayout from "../components/BaseLayout";
import {useEffect, useState} from "react";
import {fetchPostsFromSourcesAndCache} from '../components/PostManager'
import FeedCard from "../components/cards/FeedCard";
import ConvertedVideo from "../components/redditVideo";
import {all} from "axios";
export default function Home() {
    const [posts, setPosts] = useState([]);
    const video = ConvertedVideo("https://v.redd.it/xw54bsknrymb1/HLSPlaylist.m3u8?a=1696766141%2CNDkyY2RkNjllZTAxMDg1ZjIwNjRiMWZkNWE0NTg1MjMwMmY0MGE2ZTdlNTk3MTY5YzQ1NTU5NjcxNDY5MDMyYQ%3D%3D&amp;v=1&amp;f=sd")
    useEffect(() => {
        async function loadPosts() {
            const allPosts = await fetchPostsFromSourcesAndCache();
            // const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || [];
            // const unseenPosts = allPosts.filter(post => !seenPosts.includes(post.id)); // Assuming each post has a unique identifier like 'id'
            setPosts(allPosts);
        }

        loadPosts().catch(error => {
            // Handle any errors here
            console.error('Error loading posts:', error);
        });
    }, []);

    // Function to mark a post as seen
    const markPostAsSeen = (postId) => {
        const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || [];
        seenPosts.push(postId);
        localStorage.setItem('seenPosts', JSON.stringify(seenPosts));
    };

    return (
        <BaseLayout>
            <div id='sample-key-div'>
            {/*<FeedCard*/}
            {/*    title="Sample"*/}
            {/*    description='big chuggy thnanossa'*/}
            {/*    videoClip={video}*/}
            {/*    date='Now'*/}
            {/*    sourceName='Sample'*/}
            {/*/>*/}
            {/*<FeedCard*/}
            {/*    title="Sample"*/}
            {/*    description='https://unsplash.com/photos/a-person-standing-in-a-field-with-mountains-in-the-background-VXBc3QP_ek4'*/}
            {/*    url='https://unsplash.com/photos/a-person-standing-in-a-field-with-mountains-in-the-background-VXBc3QP_ek4'*/}
            {/*    date='Now'*/}
            {/*    sourceName='Sample'*/}
            {/*    //videoId='A6g8xc0MoiY'*/}
            {/*/>*/}
            {/*<FeedCard*/}
            {/*    title="Sample"*/}
            {/*    description='big chuggy thnanossa'*/}
            {/*    imageUrl={"https://i.redd.it/exmpxrh2akmb1.jpg"}*/}
            {/*    date='Now'*/}
            {/*    sourceName='Sample'*/}
            {/*/>*/}
            </div>
            {posts.map((post) => {
                if (post){
                    return (
                        <div key={post.id} id='feed-key-div'>
                            {post.sourceType === 'reddit' ? (
                                <FeedCard

                                    videoURL={post.videoURL}
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