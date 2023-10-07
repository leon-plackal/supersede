import React, {ReactNode} from "react";
import {useAuth} from "../supabase/Auth";
import {supabaseClient} from "../supabase/supabaseclient";

export default function SavePostButton ({ postID, source, title }: {
    postID: string;
    source: string;
    title: string;
}) {
    const { user } = useAuth();

    const handleSavePost = async () => {
        const postToSave = {
            user_id: user?.id, // Ensure user is not null or undefined before accessing id
            post_url: postID,
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
                // Optionally, you can update your component state to indicate that the post has been saved
            }
        } catch (error) {
            console.error('Error saving post:');
        }
    };

    return (
        <button onClick={handleSavePost}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
        </button>
    );
};

