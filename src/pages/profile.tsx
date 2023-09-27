import BaseLayout from "../components/BaseLayout";
import Card from "../components/cards/Card";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState } from "react";
import {supabaseClient} from "../supabase/supabaseclient";
import {Button, Checkbox} from "@mui/material";
import InterestPicker from "../components/InterestPicker";
export default function Profile() {




    // @ts-ignore
    return (
        <BaseLayout hideNav={false}>
            <div className='pb-4'>
                <h1 className="text-3xl font-semibold ">Account settings</h1>
                <p>Welcome back, USER</p>
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
            <InterestPicker source={"AI Articles"}/>

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
