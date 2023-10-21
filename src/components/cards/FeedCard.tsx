import React, { useEffect, useRef, useState } from 'react';
import Card from "./Card";
import { useOnScreen } from "../../utilities/useOnScreen";
import ConvertedVideo from "../redditVideo";
import SavePostButton from "../SavePostButton";
import UnsavePostButton from "../UnsavePostButton";
import { supabaseClient } from '../../supabase/supabaseclient';
import { useAuth } from '../../supabase/Auth';
import toast from 'react-hot-toast';
import SourceIconPicker from '../sourceIconPicker';

interface FeedCardProps {
    postID: string;
    videoURL?: string;
    videoId?: string;
    title: string;
    imageUrl?: string;
    url?: string;
    date?: string;
    sourceName: string;
    sourceType: string;
    description?: string;
    savedPost?: boolean
}

export default function FeedCard({
    postID,
    title,
    description,
    videoURL,
    imageUrl,
    date,
    sourceName,
    sourceType,
    url,
    videoId,
    savedPost
}: FeedCardProps) {

    //States and styles
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [saved, setSaved] = useState(savedPost);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(true);
    const { user } = useAuth();
    const inactiveNavStyle = "flex justify-center gap-3 py-2 my-1 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-100 hover:shadow-md shadow-gray-400";

    //Unsaving posts
    const handleUnsavePost = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            // Delete the saved post from the Supabase database
            await supabaseClient.from('saved_posts').delete().eq('post_id', postID);
            toast.error('Unsaved post');
            setSaved(false);

        } catch (error: any) {
            console.error('Error unsaving post:', error.message);
        }
    };

    //Marking posts as seen
    const markPostAsSeen = (postId: string) => {
        const seenPostsJSON = localStorage.getItem('seenPosts');
        const seenPosts = seenPostsJSON ? JSON.parse(seenPostsJSON) : [];

        // Check if the postId is not already in the seenPosts array
        if (!seenPosts.includes(postId)) {
            // If it's not present, add it
            seenPosts.push(postId);
            localStorage.setItem('seenPosts', JSON.stringify(seenPosts));
        }
    };

    //Saving posts
    const handleSavePost = async (event: React.MouseEvent) => {
        event.stopPropagation()
        const postToSave = {
            user_id: user?.id, // Ensure user is not null or undefined before accessing id
            post_id: postID,
            url: url,
            source: sourceName,
            title: title,
            vid_url: videoURL,
            vid_id: videoId,
            img_url: imageUrl,
            description: description,
            created_at: new Date(),
        };

        try {
            const { data, error } = await supabaseClient.from('saved_posts').upsert([postToSave]);

            if (error) {
                console.error('Error saving post:', error.message);
            } else {
                toast.success('Post saved');
                setSaved(true)
                markPostAsSeen(postID);
                setCardVisible(false);
            }
        } catch (error) {
            toast.error('Error saving post');
        }
    };

    //Converting reddit videos
    let videoMP4;
    if (videoURL) {
        videoMP4 = ConvertedVideo(videoURL);
    }

    //Opening links in new tab
    const openInNewTab = (url: string, event: React.MouseEvent) => {
        event.stopPropagation();
        window.open(url, "_blank", "noreferrer");
    };

    // Close the dropdown menu when the user clicks outside of it
    const divRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsDivVisible(false);
            }
        }

        if (isDivVisible) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isDivVisible]);

    // Toggle the dropdown menu
    const toggleDiv = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDivVisible(!isDivVisible);
    };

    // Copy the post link to the clipboard
    const copyLink = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (url)
            navigator.clipboard.writeText(url)
                .then(() => {
                    toast.success("Link Copied")
                })
                .catch((error) => {
                    toast.error("Failed to copy link")
                    console.error('Failed to copy URL to clipboard:', error);
                });
    };

    return (
        <div>
            {cardVisible && (
                <Card expand={true} colour={""} padding={""}>
                    <div id='header' className="flex gap-3" ref={elementRef}>
                        <div className="grow">
                            <a href={url} target="_blank" rel='noreferrer'>
                                <span className="mr-1 text-lg md:text-2xl font-semibold hover:underline hover:cursor-pointer">{title}</span>
                            </a>
                            <p className="text-lTextSecondary dark:text-dTextSecondary text-xs md:text-sm">{date}</p>
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className=''>
                                <button className='flex items-center gap-2 whitespace-nowrap hover:underline hover:cursor-pointer' onClick={(e) => openInNewTab(`${url}`, e)}>
                                    <SourceIconPicker source={sourceType} />
                                    <div className='mt-2 text-xs md:text-sm'>
                                        {sourceName}
                                    </div>
                                </button>
                            </div>
                            <div className='text-center hidden'>
                                <button className="text-lTextPrimary dark:text-dTextPrimary z-50" onClick={toggleDiv}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </button>
                                {isDivVisible && (
                                    <div className="relative z-50">
                                        <div className="absolute w-28 flex flex-col justify-center right-0 bg-lCardBg dark:bg-dCardBg2 shadow-md shadow-gray-400 dark:shadow-gray-900 p-1 rounded-md">
                                            <button className={inactiveNavStyle}>
                                                See More
                                            </button>
                                            <button className={inactiveNavStyle}>
                                                See Less
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div id='content-container' className='overflow-hidden rounded-md  mt-2'>
                        <div className="">
                            {imageUrl && (
                                <img className='w-full rounded-md' src={imageUrl} alt="" />
                            )}
                        </div>
                        <div className='text-sm mt-2'>
                            {description && (
                                description
                            )}
                        </div>
                        <div className="" onClick={(e) => e.stopPropagation()}>
                            {videoURL && (
                                videoMP4
                            )}
                        </div>
                        <div className='relative'>
                            {videoId && (
                                <iframe
                                    className='w-full h-64 md:h-80 rounded-md'
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    allowFullScreen
                                    title={`Embedded Video`}
                                ></iframe>
                            )}
                        </div>
                        {/* <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-200 dark:from-black to-transparent rounded-md"></div> */}
                    </div>

                    <div id='bottom-card-nav' className="mt-3 flex gap-7 md:justify-between">
                        {!saved ? (<button onClick={handleSavePost}><SavePostButton /></button>) : (<button onClick={handleUnsavePost}><UnsavePostButton /></button>)}

                        <button onClick={copyLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-5 w-5 hover:text-blue-600 duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                        </button>
                    </div>
                </Card>
            )}
        </div>


    );
}
