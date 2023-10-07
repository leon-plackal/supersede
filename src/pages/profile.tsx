import BaseLayout from "../components/BaseLayout";
import Card from "../components/cards/Card";
import React from "react";
import {Button} from "@mui/material";
import InterestPicker from "../components/InterestPicker";
import {useAuth} from "../supabase/Auth";

export default function Profile() {
    const { user } = useAuth();

    // Check if the user is authenticated
    const isAuthenticated = user !== null;

    return (
        <BaseLayout hideNav={false}>
            <div className='pb-4'>
                <h1 className="text-3xl font-semibold ">Account settings</h1>
                {isAuthenticated? (
                    <p>Welcome back, {user?.email}</p>
                ) : (
                    <p>No user Logged In!</p>
                )}

            </div>
            <Card padding={'none'} colour={""} expand={false}>
                <div className="relative">
                    <div className="h-36 overflow-hidden flex justify-center items-center rounded-md">
                        <img src="/clay-banks-wueUmXl5TU0-unsplash.jpg" alt="" />
                    </div>
                    <div className='absolute bottom-2 left-2'>
                        <h1 className='font-semibold text-2xl text-lTextPrimary dark:text-dTextPrimary'>Display Name</h1>
                    </div>
                </div>
            </Card>

            <InterestPicker source={"Reddit"}/>
            <InterestPicker source={"News"}/>
            <InterestPicker source={"Youtube"}/>
            <InterestPicker source={"AI_Articles"}/>

            <Card>
                <div>
                    <h2>Your Account</h2>
                    <p>Would you like to delete your account? WARNING: This cannot be undone!</p>
                    <Button variant="outlined" color="error">DELETE</Button>
                </div>

            </Card>

        </BaseLayout>
    );
}
