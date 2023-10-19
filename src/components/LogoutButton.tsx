import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabase/supabaseclient';

const LogoutButton = () => {
    const [isLogoutDialogVisible, setLogoutDialogVisible] = useState(false);

    const navigate = useNavigate();

    async function logout() {
        const { error } = await supabaseClient.auth.signOut();
    }

    supabaseClient.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_OUT') {
            navigate('/login');
        }
    });

    return (
        <div className='relative'>
            <button onClick={() => setLogoutDialogVisible(true)} className="w-full">
                <span className='items-center dark:text-dTextPrimary text-lTextPrimary flex gap-3 py-3 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>

                    Logout
                </span>
            </button>

            {isLogoutDialogVisible && (     
                <div className="fixed px-4 min-h-screen top-0 left-0 right-0 md:flex md:items-center md:justify-center dialogfadein z-50">
                    <div className="opacity-25 w-full h-full absolute inset-0"></div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative drop-shadow-md">
                        <div className="md:flex items-center">
                            <div className="text-lTextPrimary dark:text-dTextPrimary mt-4 md:mt-0 text-center md:text-left">
                                <p className="font-bold">Logout?</p>
                                <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">You must sign in again to access your account.
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                            <button onClick={logout} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                Logout
                            </button>
                            <button onClick={() => setLogoutDialogVisible(false)} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 text-black bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutButton;
