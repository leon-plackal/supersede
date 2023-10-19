import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../../supabase/supabaseclient';
import LogoutButton from '../LogoutButton';


export default function NavigationCard() {
    


    const activeNavStyle =
        'flex gap-3 py-3 bg-blue-600 text-white -mx-4 px-4 rounded-md shadow-md';
    const inactiveNavStyle =
        'items-center dark:text-dTextPrimary text-lTextPrimary flex gap-3 py-3 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-400';

    return (
        <div className="bg-lNavBg dark:bg-dNavBg h-full fixed px-8 -mx-6 py-2 transition-all duration-500">
            <div className="NavMq:w-48 w-36 text-white mt-4 flex flex-col h-full justify-between">
                <div className='relative'>
                    <Link
                        to="/"
                        className={inactiveNavStyle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        Home
                    </Link>
                    <Link
                        to="/saved"
                        className={inactiveNavStyle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>

                        Saved Posts
                    </Link>


                    <Link
                        to="/profile"
                        className={inactiveNavStyle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        Profile
                    </Link>
                    <Link
                        to="/notifications"
                        className={inactiveNavStyle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>

                        Notifications
                    </Link>
                    {/* <button onClick={logout} className="w-full">
                        <span className={inactiveNavStyle}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>

                            Logout
                        </span>
                    </button> */}
                    <LogoutButton/>
                </div>

                <div className=' -translate-y-20'>
                    <p className=' text-xs text-lTextSecondary'>&copy; 2023 Supersede. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
