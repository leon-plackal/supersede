import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseClient } from '../supabase/supabaseclient';


export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [session, setSession] = useState<Session | null>()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const Login = async () => {
        setLoading(true);
        try {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
            navigate("/");
        } catch (err) {
            throw err;
        } finally {
            setEmail('')
            setPassword('')
            setLoading(false);
        }
    }

    const Logout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        if (error) throw error
    }

    if (loading) return (<div>Loading...</div>)


    return (
        <BaseLayout hideNav={true}>
            <div className="flex items-center my-auto md:h-full w-full">
                <div className="mx-auto w-full sm:w-96">
                    <div>
                        <div className="bg-white rounded-md shadow-sm dark:bg-gray-200 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                                    
                                </div>
                                <Auth supabaseClient={supabaseClient} 
                                appearance={{
                                    theme: ThemeSupa, 
                                    style: {
                                        button: { borderColor: 'gray' },
                                        input: { background: 'white', borderColor: 'gray' },
                                        label: { color: 'black' },
                                        anchor: { color: 'black' },
                                    },
                                }} providers={['google']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
