import BaseLayout from "../components/BaseLayout";
import React, {useEffect, useState} from "react";
import InterestPicker from "../components/InterestPicker";
import { useAuth } from "../supabase/Auth";
import LoaderSquare from "../components/LoaderSquare";
import { clearCache } from "../services/PostManager";
import toast from "react-hot-toast";

export default function Profile() {
    const { user } = useAuth();

    // Check if the user is authenticated
    const isAuthenticated = user !== null;
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = async () => {
        // Clear the cache for 'cached posts'
        clearCache();
        toast.success('Refreshed feed!');
    };

    return (
        <BaseLayout hideNav={false}>
            <div className='pb-4'>
                <h1 className="text-3xl font-semibold ">Your Preferences</h1>
                {isAuthenticated ? (
                    <p>Welcome back, {user?.user_metadata.name}</p>
                ) : (
                    <p>No user Logged In!</p>
                )}

            </div>
            
            <div className="mb-4 text-sm">
                <p className="mb-1">Please enter your interests here. You may choose interests from the dropdown menu, or type in your own and press enter. Use the switch to toggle whether or not you would like to see posts from that particular source.</p>
                <p>Supersede works best when you break down your interests into one or two conside words, please avoid using sentences. When typing interests for Reddit, please specify valid subreddits, or the interest will not return any posts as of now.</p>
            </div>
            
            {loading && <div className="flex justify-center items-center h-96 flex-col gap-2"><LoaderSquare message="Loading your profile..."/></div>}
            <div className="flex justify-end px-2" style={{visibility: loading ? 'hidden' : 'visible'}}>
                <button onClick={handleRefresh} className="rounded-sm text-white bg-blue-600 hover:bg-blue-600 dark:bg-blue-600 px-2 p-1 dark:hover:bg-blue-500 transition-all duration-300">
                    Refresh Feed
                </button>
            </div>
            <div style={{visibility: loading ? 'hidden' : 'visible'}}>
                <InterestPicker source={"Reddit"} />
                <InterestPicker source={"News"} />
                <InterestPicker source={"Youtube"} />
                <InterestPicker source={"AI_Articles"} />
            </div>
            {/* <Card>
                <div>
                    <h2>Your Account</h2>
                    <p>Would you like to delete your account? WARNING: This cannot be undone!</p>
                    <Button variant="outlined" color="error">DELETE</Button>
                </div>
            </Card> */}
        </BaseLayout>
    );
}
