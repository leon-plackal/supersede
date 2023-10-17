import React from "react";
import BaseLayout from "../components/BaseLayout";
import { useEffect, useState } from "react";
import {useAuth} from "../supabase/Auth";
import {supabaseClient} from "../supabase/supabaseclient";
import FeedCard from "../components/cards/FeedCard";


export default function SavedPostsPage(){
    const [savedPosts, setSavedPosts] = useState<any[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchSavedPosts = async () => {
          const { data, error } = await supabaseClient
            .from("saved_posts")
            .select("*")
            .eq("user_id", user?.id);
      
          if (error) {
            console.error("Error fetching saved posts:", error);
          } else {
            setSavedPosts(data);
          }
        };
        fetchSavedPosts();
      }, []);

    return(
       <BaseLayout hideNav={false}>
           <h1 className='text-3xl font-semibold mb-4 text-lTextPrimary dark:text-dTextPrimary'>Saved Posts</h1>
           {savedPosts.map((post) => (
                    <div key={post.id} id='feed-key-div'>
                        <FeedCard
                            postID={post.post_id}
                            title={post.title}
                            sourceName={post.source}
                            savedPost={true}
                        />
                    </div>
                    ))}
       </BaseLayout>
    )
}