import BaseLayout from "../components/BaseLayout";
import Card from "../components/cards/Card";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState } from "react";
import {supabaseClient} from "../supabase/supabaseclient";
import {Checkbox} from "@mui/material";

export default function Profile() {
    const interestTags = [
        { title: 'Astronomy', year: 1994 },
        { title: 'Marvel', year: 1972 },
        { title: 'Dinosaurs', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings',
            year: 2003,
        },
        { title: 'Tennis', year: 1966 },
        { title: 'Memes', year: 1999 },
        {
            title: 'Typescript',
            year: 2001,
        },
    ];

    const [selectedTags, setSelectedTags] = useState([""]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Example code for fetching user interests
        const getUserInterests = async (userId: string) => {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .select('*')
                .eq('user_id', userId);
            if (error) {
                console.error('Error fetching interests:', error);
            }
            if (data){
                const initialInterests = data.map((interest) => interest.interest_name);
                // Set the selectedTags state with the initial interests
                setSelectedTags(initialInterests);
            }
            return data;
        };
        const fetchUserData = async () => {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user){
                setUserId(user.id)
                getUserInterests(user.id)
            }
        };
        fetchUserData();

    }, []);

    // Example code for adding user interests
    const addInterest = async (userId: string, interestName: string, weightingValue: number) => {
        try {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .insert([{ user_id: userId, interest_name: interestName, weighting_value: weightingValue }]);

            if (error) {
                console.error('Error adding interest:', error);
            } else {
                console.log('Interest added successfully:', interestName);
            }
        } catch (error) {
            console.error('Error adding interest:', error);
        }
    };

    const removeInterest = async (userId: string, interestName: string) => {
        try {
            console.log(userId,interestName);
            const { data, error } = await supabaseClient
                .from('user_interests')
                .delete()
                .eq('user_id', userId)
                .eq('interest_name', interestName);

            if (error) {
                console.error('Error removing interest:', error);
            } else {
                console.log('Interest removed successfully:', data);
            }

        } catch (error) {
            console.error('Error removing interest:', error);
        }
    };



    // @ts-ignore
    return (
        <BaseLayout hideNav={false}>
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

            <Card padding={'none'} colour={""} expand={false}>
                <div>
                    <div className="flex items-center p-2">
                        <h2 className="font-semibold text-2xl">Subreddits</h2>
                        <Checkbox/>
                    </div>

                    <div className="p-2 grow">
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={interestTags.map((option) => option.title)}
                            value={selectedTags}
                            onChange={(event, newValue) => {
                                setSelectedTags(newValue);
                                const addedTags = newValue.filter((tag) => !selectedTags.includes(tag));
                                const removedTags = selectedTags.filter((tag) => !newValue.includes(tag));

                                // Add new interests
                                addedTags.forEach((tag) => {
                                    addInterest(userId, tag, 1);
                                });

                                // Remove interests
                                removedTags.forEach((tag) => {
                                    removeInterest(userId, tag); // Implement the removeInterest function
                                });
                            }}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        color="primary"
                                        label={option}
                                        // @ts-ignore
                                        onDelete={() => {
                                            const newValue = selectedTags.filter((tag) => tag !== option);
                                            setSelectedTags(newValue);
                                            removeInterest(userId, option); // Implement the removeInterest function
                                        }}
                                        {...getTagProps({ index })}
                                        key={index}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Add your interests..."
                                    onKeyDown={(e) => {
                                        // Handle Enter key press to add the tag
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            // @ts-ignore
                                            const inputValue = e.target.value.trim(); // Get input value from event
                                            if (inputValue !== '') {
                                                const defaultWeightingValue = 1;
                                                addInterest(userId, inputValue, defaultWeightingValue);
                                            }
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </Card>
        </BaseLayout>
    );
}
