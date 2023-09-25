import React from 'react';
import BaseLayout from '../components/BaseLayout';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

// @ts-ignore
const supabase = createClient('https://itaxkdkvrsdroytbpeoh.supabase.co', import.meta.env.VITE_SUPABASE_KEY);

export default function LoginPage() {
    const navigate = useNavigate();
    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
            navigate("/");
        }
    });
    async function loginWithGoogle() {

    }

    return (
        <BaseLayout hideNav={true}>
            <div className="-mt-12 flex items-center h-screen">
                <div className="w-auto mx-auto md:w-96">
                    <div>
                        <div className="bg-white rounded-md shadow-sm dark:bg-dCardBg dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Don't have an account yet?
                                        <a className="text-blue-600 decoration-2 hover:underline font-medium ml-1" href="/">
                                            Sign up here
                                        </a>
                                    </p>
                                </div>
                                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google', 'discord']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
