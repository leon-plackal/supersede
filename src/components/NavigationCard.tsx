import React from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://itaxkdkvrsdroytbpeoh.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error('REACT_APP_SUPABASE_KEY is not defined in your environment.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default function NavigationCard() {
    const navigate = useNavigate();

    async function logout() {
        const { error } = await supabase.auth.signOut();
    }

    supabase.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_OUT') {
            navigate('/login');
        }
    });


    const activeNavStyle =
        'flex gap-3 py-3 bg-blue-600 text-white -mx-4 px-4 rounded-md shadow-md';
    const inactiveNavStyle =
        'dark:text-dTextPrimary text-lTextPrimary flex gap-3 py-3 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-400';

    return (
        <div className="bg-lNavBg dark:bg-dNavBg h-full fixed px-8 -mx-6 py-2 transition-all duration-500">
            <div className="NavMq:w-48 w-36 text-white mt-4">
                <Link
                    to="/"
                    className={inactiveNavStyle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {/* Add SVG path data here */}
                    </svg>
                    Home
                </Link>
                <Link
                    to="/saved"
                    className={inactiveNavStyle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {/* Add SVG path data here */}
                    </svg>
                    Saved Posts
                </Link>
                <Link
                    to="/notifications"
                    className={inactiveNavStyle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {/* Add SVG path data here */}
                    </svg>
                    Notifications
                </Link>
                <button onClick={logout} className="w-full">
          <span className={inactiveNavStyle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
              {/* Add SVG path data here */}
            </svg>
            Logout
          </span>
                </button>
                <button className="w-full">
          <span className={inactiveNavStyle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
              {/* Add SVG path data here */}
            </svg>
            Friends
          </span>
                </button>
            </div>
        </div>
    );
}
