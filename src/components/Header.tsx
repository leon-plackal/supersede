import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeChangerBtn from '../components/ThemeChangerBtn';
import { useAuth } from '../supabase/Auth';
import { supabaseClient } from '../supabase/supabaseclient';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    // Function to toggle the 'open' class when the button is pressed
    const toggleOpenClass = () => {
        setIsOpen(!isOpen);
    };
    const { user } = useAuth();
    // Check if the user is authenticated
    let isAuthenticated = false;
    if (user) {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }
    //const isAuthenticated = user !== null;

    // Function to logout the user
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
        <header className="font-font1 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white drop-shadow-lg text-sm py-3 md:py-0 dark:bg-darkModeBlue dark:border-gray-700">
            <nav className="relative max-w-7xl w-full mx-auto px-4 md:flex md:items-center md:justify-between md:px-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between">
                    
                    <div className='flex grow justify-between item pr-4'>
                    <Link className="glitch play flex-none text-xl font-semibold font-font2 dark:text-white" to="/" aria-label="Brand" data-glitch="SUPERSEDE">
                        SUPERSEDE
                    </Link>
                    
                    <div className='md:hidden mt-1'>
                        <ThemeChangerBtn />
                    </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
                            data-hs-collapse="#navbar-collapse-with-animation"
                            aria-controls="navbar-collapse-with-animation"
                            aria-label="Toggle navigation"
                            onClick={toggleOpenClass}
                        >
                            <svg className={`${isOpen ? 'hidden' : 'w-4 h-4'}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            <svg className={`${isOpen ? 'w-4 h-4' : 'hidden'}`} width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="navbar-collapse-with-animation" className={`md:block hs-collapse transition-all duration-500 basis-full grow overflow-hidden ${isOpen ? 'open h-56' : 'h-0 md:h-16'}`}>
                    <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
                    <div className='md:block mt-1 hidden'>
                    <ThemeChangerBtn />
                    </div>
                        <Link className="font-medium text-lightPrimary hover:text-blue-600 md:py-6 dark:text-dTextPrimary dark:hover:text-blue-500" to="/aboutus">
                            About Us
                        </Link>
                        <Link className="block md:hidden font-medium text-lightPrimary hover:text-blue-600 md:py-6 dark:text-dTextPrimary dark:hover:text-blue-500" to="/saved">
                            Saved Posts
                        </Link>
                        <Link className="block md:hidden font-medium text-lightPrimary hover:text-blue-600 md:py-6 dark:text-dTextPrimary dark:hover:text-blue-500" to="/profile">
                            Profile
                        </Link>
                        <Link className="block md:hidden font-medium text-lightPrimary hover:text-blue-600 md:py-6 dark:text-dTextPrimary dark:hover:text-blue-500" to="/notifications">
                            Notifications
                        </Link>
                        {isAuthenticated &&
                            <button onClick={logout} className='block md:hidden text-left font-medium text-lightPrimary hover:text-blue-600 md:py-6 dark:text-dTextPrimary dark:hover:text-blue-500'>
                                Logout
                            </button>
                        }

                        {isAuthenticated ? (
                            <div>
                                <div className='dark:text-dTextSecondary text-lTextSecondary'>Welcome, {user?.user_metadata.name}</div>
                            </div>
                        ) : (
                            <Link className="flex items-center gap-x-2 font-medium text-lightPrimary dark:text-dTextSecondary hover:text-blue-600 md:border-l md:border-gray-300 md:my-6 md:pl-6 dark:border-gray-700 dark:hover:text-blue-500" to="/login">
                                <svg className="w-4 h-4 hidden md:block" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                Log in
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
