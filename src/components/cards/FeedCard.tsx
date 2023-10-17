import React, { useEffect, useRef, useState } from 'react';
import Card from "./Card";
import { useOnScreen } from "../../utilities/useOnScreen";
import ConvertedVideo from "../redditVideo";
import SavePostButton from "../SavePostButton";
import UnsavePostButton from "../UnsavePostButton";
import { supabaseClient } from '../../supabase/supabaseclient';
import { useAuth } from '../../supabase/Auth';

interface FeedCardProps {
    postID: string;
    videoURL?: string;
    videoId?: string;
    title: string;
    imageUrl?: string;
    url?: string;
    date?: string;
    sourceName: string;
    description?: string;
    publishedAt?: string;
    savedPost?:boolean
}

export default function FeedCard({
                                     postID,
                                     title,
                                     description,
                                     videoURL,
                                     imageUrl,
                                     date,
                                     sourceName,
                                     url,
                                     videoId,
                                     savedPost
                                 }: FeedCardProps) {

    const elementRef = useRef<HTMLDivElement | null>(null);
    const isOnScreen = useOnScreen(elementRef);
    const [saved, setSaved] = useState(savedPost);
    const { user } = useAuth();

    
    //Unsaving posts
    const handleUnsavePost = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            // Delete the saved post from the Supabase database
            await supabaseClient.from('saved_posts').delete().eq('post_id', postID);
            console.log(postID)
            setSaved(false);

        } catch (error: any) {
            console.error('Error unsaving post:', error.message);
        }
    };

    //saving posts
    const handleSavePost = async (event: React.MouseEvent) => {
        event.stopPropagation()
        const postToSave = {
            user_id: user?.id, // Ensure user is not null or undefined before accessing id
            post_id: postID,
            url: url,
            source: sourceName,
            title: title,
            created_at: new Date(),
        };

        try {
            const { data, error } = await supabaseClient.from('saved_posts').upsert([postToSave]);

            if (error) {
                console.error('Error saving post:', error.message);
            } else {
                console.log('Post saved successfully:', data);
                setSaved(true)
            }
        } catch (error) {
            console.error('Error saving post:');
        }
    };

                                


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

    useEffect(() => {
        if (isOnScreen) {
            // Call markPostAsSeen when the post enters the screen TODO: re-enable
            //markPostAsSeen(postID); // Assuming key is a unique identifier for the post
        }
    }, [isOnScreen]);

    let videoMP4;
    if(videoURL){
        videoMP4 = ConvertedVideo(videoURL);
    }

    const inactiveNavStyle = "flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400";
    const openInNewTab = (url: string, event: React.MouseEvent) => {
        event.stopPropagation();
        window.open(url, "_blank", "noreferrer");
    };
    const [isDivVisible, setIsDivVisible] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsDivVisible(false);
            }
        }

        if (isDivVisible) {
            // Add a click event listener to the document
            document.addEventListener('click', handleOutsideClick);
        } else {
            // Remove the click event listener when the div is not visible
            document.removeEventListener('click', handleOutsideClick);
        }

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isDivVisible]);

    const toggleDiv = (e: React.MouseEvent) => {
        console.log("toggle pressed");
        e.stopPropagation();
        setIsDivVisible(!isDivVisible);
    };

    return (
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
                        <button className='flex items-center gap-2 whitespace-nowrap' onClick={(e) => openInNewTab(`${url}`, e)}>
                            <svg className='mt-2 hidden md:block dark:fill-red-500 fill-blue-600' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"/></svg>
              <div className='mt-2 text-xs md:text-sm'>
                {sourceName}
              </div>
            </button>
          </div>
          <div className='text-center'>
            <button className="text-lTextPrimary dark:text-dTextPrimary z-50" onClick={toggleDiv}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                        {isDivVisible && (
                            <div className="relative z-50">
                                <div className="absolute w-40 right-0 bg-lCardBg dark:bg-dCardBg2 shadow-md shadow-gray-400 dark:shadow-gray-900 p-1 rounded-md">
                                    <a href="/" className={inactiveNavStyle}>
                                        <svg key="save" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        </svg>
                                        Save Post
                                    </a>
                                    <a href="/" className={inactiveNavStyle}>
                                        <svg key="not-interested" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        </svg>
                                        Not Interested
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div id='content-container' className='overflow-hidden rounded-md relative mt-2'>
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
                {/*<div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-200 dark:from-black to-transparent rounded-md"></div>*/}
            </div>

            <div id='bottom-card-nav' className="mt-3 flex gap-7 md:justify-between">
                {!saved? (<button onClick={handleSavePost}><SavePostButton/></button>) : (<button onClick={handleUnsavePost}><UnsavePostButton/></button> )}

                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                </button>
            </div>
        </Card>
    );
}
