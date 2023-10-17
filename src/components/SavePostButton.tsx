import React, {ReactNode, useState} from "react";
import {useAuth} from "../supabase/Auth";
import {supabaseClient} from "../supabase/supabaseclient";

export default function SavePostButton ({ postID, source, title }: {
    postID: string;
    source: string;
    title: string;
}) {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false)

    const handleSavePost = async (event: React.MouseEvent) => {
        event.stopPropagation()
        const postToSave = {
            user_id: user?.id, // Ensure user is not null or undefined before accessing id
            url: postID,
            source: source,
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
                // Optionally, you can update your component state to indicate that the post has been saved
            }
        } catch (error) {
            console.error('Error saving post:');
        }
    };

    const handleRemovePost = async (postId: string) => {
        try {
            // Delete the saved post from the Supabase database
            await supabaseClient.from('saved_posts').delete().eq('id', postId);

        } catch (error) {
            // @ts-ignore
            console.error('Error removing saved post:', error.message);
        }
    };
    return (
        <button onClick={handleSavePost}>
            {!saved?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>)}

        </button>
    );
};

