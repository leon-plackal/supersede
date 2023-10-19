import React, {useState, ReactNode, useEffect} from "react";
import {supabaseClient} from "../supabase/supabaseclient";
import {Checkbox, Switch} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Card from "../components/cards/Card";
import toast from "react-hot-toast";
import validator from 'validator';


export default function InterestPicker({ source }: {
    source: string;
}) {
    const interestTags = [
        { title: 'Astronomy'},
        { title: 'Marvel'},
        { title: 'Dinosaurs'},
        { title: 'The Dark Knight'},
        { title: 'Chess'},
        { title: 'The Lord of the Rings'},
        { title: 'Tennis'},
        { title: 'Memes'},
        { title: 'Typescript'},
    ];

    const [selectedTags, setSelectedTags] = useState([""]);
    const [userId, setUserId] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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
                .eq( 'source_type', source);

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
            return;
        }
    
        try {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .insert([{ user_id: userId, interest_name: interestName, weighting_value: weightingValue, source_type: source }]);
    
            if (error) {
                console.error('Error adding interest:', error);
            }
        } catch (error) {
            console.error('Error adding interest:', error);
        }
    };

    const removeInterest = async (userId: string, interestName: string) => {
        try {
            const { data, error } = await supabaseClient
                .from('user_interests')
                .delete()
                .eq('user_id', userId)
                .eq('interest_name', interestName);

            if (error) {
                console.error('Error removing interest:', error);
            }
        } catch (error) {
            console.error('Error removing interest:', error);
        }
    };
    return (
        <div className={`${isChecked ? '' : 'opacity-50'}`}>
            <Card padding={'none'} colour={"white"} expand={false} noHover={true}>
                <div>
                    <div className="flex items-center justify-between p-2">
                        <h2 className="font-semibold text-2xl pb-1">{source === "AI_Articles" ? "AI Articles" : source}</h2>
                        <Switch checked={isChecked} onChange={handleCheckboxChange} />
                    </div>

                    <div className="p-2 grow">
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={interestTags.map((option) => option.title)}
                            value={selectedTags}
                            onChange={(event, newValue) => {
                                // Validate tag length before adding to selectedTags
                                const isValidTag = newValue.every(tag => tag.length <= 25);
                                if (isValidTag) {
                                    setSelectedTags(newValue);
                                    const addedTags = newValue.filter(tag => !selectedTags.includes(tag));
                                    const removedTags = selectedTags.filter(tag => !newValue.includes(tag));
                        
                                    // Add new interests
                                    addedTags.forEach(tag => {
                                        addInterest(userId, tag, 1, source);
                                    });
                        
                                    // Remove interests
                                    removedTags.forEach(tag => {
                                        removeInterest(userId, tag); // Implement the removeInterest function
                                    });
                                } else {
                                    // Handle validation error (e.g., display a message to the user)
                                    toast.error('Tag too long!');
                                }
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
                                    sx={{ input: { color: 'gray' } }}
                                    onKeyDown={(e) => {
                                        // Handle Enter key press to add the tag
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
