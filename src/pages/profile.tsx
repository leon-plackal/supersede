import BaseLayout from "../components/BaseLayout";
import React, { useEffect, useState } from "react";
import InterestPicker from "../components/InterestPicker";
import { useAuth } from "../supabase/Auth";
import LoaderSquare from "../components/LoaderSquare";
import { clearCache } from "../services/PostManager";
import toast from "react-hot-toast";
import Card from "../components/cards/Card";
import { supabaseClient } from "../supabase/supabaseclient";

export default function Profile() {
    const { user } = useAuth();

    // Check if the user is authenticated
    const isAuthenticated = user !== null;
    const [loading, setLoading] = useState(true);
    const [isDialogVisible, setDialogVisible] = useState(false);

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

    const handleDeleteData = async () => {
        // Get the logged in user's id
        const userId = user?.id;

        // Delete all matching entries from 'user_interests' table
        const { data: deletedInterests, error: interestsError } = await supabaseClient
            .from('user_interests')
            .delete()
            .eq('user_id', userId);
        toast.success('Deleted your Interests!');
        setDialogVisible(false);
        clearCache();

        if (interestsError) {
            console.error('Error deleting user interests:', interestsError);
        } else {
            console.log('Deleted user interests:', deletedInterests);
        }

        // Delete all matching entries from 'user_source_preferences' table
        const { data: deletedPreferences, error: preferencesError } = await supabaseClient
            .from('user_source_preferences')
            .delete()
            .eq('user_id', userId);
        toast.success('Deleted your saved preferences!');

        if (preferencesError) {
            console.error('Error deleting user preferences:', preferencesError);
        } else {
            console.log('Deleted user preferences:', deletedPreferences);
        }

        // Delete all matching entries from 'user_source_preferences' table
        const { data: deletedSavedPosts, error: savedPostsError } = await supabaseClient
            .from('user_source_preferences')
            .delete()
            .eq('user_id', userId);
        toast.success('Deleted your saved posts!');
        window.location.reload();
        if (savedPostsError) {
            console.error('Error deleting user preferences:', savedPostsError);
        } else {
            console.log('Deleted user preferences:', deletedSavedPosts);
        }
    }

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

            {loading && <div className="flex justify-center items-center h-96 flex-col gap-2"><LoaderSquare message="Loading your profile..." /></div>}
            <div className="flex justify-end px-2" style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <button onClick={handleRefresh} className="rounded-sm text-white bg-blue-600 hover:bg-blue-600 dark:bg-blue-600 px-2 p-1 dark:hover:bg-blue-500 transition-all duration-300">
                    Refresh Feed
                </button>
            </div>
            <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <InterestPicker source={"Reddit"} tooltip="Please choose valid subreddits. Do not include the r/" />
                <InterestPicker source={"News"} tooltip="Try general or specific news topics to fine tune your articles. Ex.Medicine, Tornadoes, Sleep Habits" />
                <InterestPicker source={"Youtube"} tooltip="You can include channel names or general search queries" />
                <InterestPicker source={"AI_Articles"} tooltip="This is quite experimental, articles will be quite random and of different styles...give it a shot!" />
            </div>
            <Card>
                <div className="">
                    <h2 className="text-xl font-semibold mb-2">Your Account</h2>
                    <p className="mb-2">Would you like to delete your account data? This includes your interests, preferences and saved posts.</p>
                    <div className="flex gap-2">
                        <span className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        </span>
                        <p className="mb-2 text-xs">WARNING: This action cannot be undone!</p>
                    </div>

                    <button onClick={() => setDialogVisible(true)} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:order-2">Delete</button>
                </div>
                {isDialogVisible && (
                    <div className="fixed px-4 min-h-screen top-0 left-0 right-0 md:flex md:items-center md:justify-center dialogfadein z-50">
                        <div className="opacity-25 w-full h-full absolute inset-0"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative drop-shadow-md">
                            <div className="md:flex items-center">
                                <div className="text-lTextPrimary dark:text-dTextPrimary mt-4 md:mt-0 text-center md:text-left">
                                    <p className="font-bold">Delete Data?</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">WARNING: This action cannot be undone!
                                    </p>
                                </div>
                            </div>
                            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                                <button onClick={handleDeleteData} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                    Delete
                                </button>
                                <button onClick={() => setDialogVisible(false)} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 text-black bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </BaseLayout>
    );
}
