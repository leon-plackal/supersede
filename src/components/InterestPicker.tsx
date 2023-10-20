import React, { useState, useEffect } from "react";
import { supabaseClient } from "../supabase/supabaseclient";
import toast from "react-hot-toast";
import validator from 'validator';
import TagChip from "./TagChip";

export default function InterestPicker({ source }: {
    source: string;
}) {
    const [selectedTags, setSelectedTags] = useState([""]);
    const [userId, setUserId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [tagValue, setTagValue] = useState('');

    const handleCheckboxChange = async (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(event.target.checked);
        try {
            // Invert the current status (toggle between enabled and disabled)
            const newStatus = !isChecked;

            // Check if the row exists
            const { data: existingRow, error: selectError } = await supabaseClient
                .from('user_source_preferences')
                .select('user_id, source_type')
                .eq('user_id', userId)
                .eq('source_type', source);

            if (selectError) {
                console.error("Error checking for existing row:", selectError);
            } else if (existingRow.length === 0) {
                // If the row doesn't exist, insert a new row
                const { data: insertData, error: insertError } = await supabaseClient
                    .from('user_source_preferences')
                    .insert([
                        {
                            user_id: userId,
                            source_type: source,
                            enabled: newStatus,
                        },
                    ]);

                if (insertError) {
                    console.error("Error inserting new row:", insertError);
                }
            } else {
                // The row exists, so update it
                const { data: updateData, error: updateError } = await supabaseClient
                    .from('user_source_preferences')
                    .update({ enabled: newStatus })
                    .eq('user_id', userId)
                    .eq('source_type', source);

                if (updateError) {
                    console.error("Error updating row:", updateError);
                }
            }

        } catch (error) {
            console.error('Error updating source preference:', error);
        }
    };

    // Function to fetch user source preferences from Supabase
    async function loadUserSourcePreferences(userId: string) {
        try {
            const { data, error } = await supabaseClient
                .from('user_source_preferences')
                .select('source_type, enabled')
                .eq('user_id', userId)
                .eq('source_type', source);

            if (error) {
                console.error("Error fetching user source preferences:", error);
                return [];
            }
            data.forEach((row) => {
                const enabled = row.enabled;
                setIsChecked(enabled)
            })
            return data;
        } catch (err) {
            console.error("Error fetching user source preferences:", err);
            return [];
        }
    }

    useEffect(() => {
        const getUserInterests = async (userId: string) => {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .select('*')
                .eq('user_id', userId)
                .eq('source_type', source);

            if (error) {
                console.error('Error fetching interests:', error);
            }
            if (data) {
                const initialInterests = data.map((interest) => interest.interest_name);
                // Set the selectedTags state with the initial interests
                setSelectedTags(initialInterests);
            }
            return data;
        };
        const fetchUserData = async () => {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                setUserId(user.id)
                getUserInterests(user.id)
                loadUserSourcePreferences(user.id);
            }
        };
        fetchUserData();

    }, []);

    // Example code for adding user interests
    const addInterest = async (userId: string, interestName: string, weightingValue: number, source: string) => {
        // Validate interestName on the client-side
        if (!validator.isLength(interestName, { min: 1, max: 25 })) {
            console.error('Invalid interest name length. Must be between 1 and 25 characters.');
            toast.error('Check tag length!')
            return;
        }

        try {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .insert([{ user_id: userId, interest_name: interestName, weighting_value: weightingValue, source_type: source }]);
                setSelectedTags(prevTags => [...prevTags, interestName]); // Update the state immutably
                toast.success('Added Tag')
            if (error) {
                console.error('Error adding interest:', error);
            }
        } catch (error) {
            console.error('Error adding interest:', error);
        }
    };

    const removeInterest = async (interestName: string) => {
        try {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .delete()
                .eq('user_id', userId)
                .eq('interest_name', interestName);
            setSelectedTags(selectedTags.filter(tag => tag !== interestName));

            if (error) {
                console.error('Error removing interest:', error);
            }
        } catch (error) {
            console.error('Error removing interest:', error);
        }
    };
    return (
        <div className={`${isChecked ? '' : 'opacity-50'}`}>
            <div className="mt-6 mb-6 flex flex-col items-center sm:mx-0 w-full">
                <div
                    className="py-4 px-6 items-center rounded shadow-lg overflow-hidden w-full sm:w-11/12 md:max-w-xl hover:shadow-xl bg-white dark:bg-dCardBg">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-semibold text-2xl pb-1">{source === "AI_Articles" ? "AI Articles" : source}</h2>
                        <label className="relative inline-flex items-center mb-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={handleCheckboxChange} />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>

                    </div>
                    <form action="#" className="mt-4">
                        <div
                            className="flex bg-gray-100 p-1 items-center w-full space-x-2 sm:space-x- rounded border border-gray-500 dark:bg-gray-700 dark:border-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50 dark:text-gray-100 ml-2" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>

                            <input
                                className="bg-gray-100 outline-none text-sm sm:text-base w-full dark:bg-gray-700 dark:text-gray-200 border-transparent focus:border-transparent focus:ring-0"
                                placeholder="Add a tag..."
                                type="text"
                                value={tagValue}
                                onChange={(e) => setTagValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addInterest(userId, tagValue, 1, source)
                                        

                                        setTagValue(''); // Clear the input field after adding the tag
                                    }
                                }}
                            />
                            <button
                                className="p-1 px-2 rounded-sm text-sm text-dTextPrimary dark:text-lTextPrimary dark:bg-slate-100 bg-slate-800"
                                onClick={() => {
                                    addInterest(userId, tagValue, 1, source)
                                    
                                    setTagValue(''); // Clear the input field after adding the tag
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </form>

                    <div className='my-3 flex flex-wrap -m-1'>

                        {selectedTags.map((tag, index) => (
                            <div key={index}><TagChip name={tag} onRemoveTag={removeInterest} /></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
