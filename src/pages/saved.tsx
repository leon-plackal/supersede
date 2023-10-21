import React from "react";
import BaseLayout from "../components/BaseLayout";
import { useEffect, useState } from "react";
import { useAuth } from "../supabase/Auth";
import { supabaseClient } from "../supabase/supabaseclient";
import FeedCard from "../components/cards/FeedCard";
import LoaderSquare from "../components/LoaderSquare";


export default function SavedPostsPage() {
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const { data, error } = await supabaseClient
        .from("saved_posts")
        .select("*")
        .eq("user_id", user?.id);
      setLoading(false);

      if (error) {
        console.error("Error fetching saved posts:", error);
      } else {
        setSavedPosts(data);
      }
    };
    fetchSavedPosts();
  }, []);

  return (
    <BaseLayout hideNav={false}>
      <h1 className='text-3xl font-semibold mb-4 text-lTextPrimary dark:text-dTextPrimary'>Saved Posts</h1>
      {loading ? <div className="flex justify-center">
        <LoaderSquare message="Loading your saved posts..." />
      </div>
        :
        <div>
          {savedPosts.length === 0 && (
            <div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-xl font-semibold">No saved posts...</div>
                <p className="mt-4 text-sm w-3/4 text-center">Click the icon in the bottom left corner of a post to save it here!</p>
              </div>
            </div>
          )}
          {savedPosts.slice().reverse().map((post) => (
            <div key={post.id} id='feed-key-div'>
              <FeedCard
                postID={post.post_id}
                url={post.url}
                sourceName={post.source}
                title={post.title}
                videoURL={post.vid_url}
                videoId={post.vid_id}
                imageUrl={post.img_url}
                description={post.description}
                savedPost={true}
                sourceType=""
              />
            </div>
          ))}
        </div>
      }
    </BaseLayout>
  )
}