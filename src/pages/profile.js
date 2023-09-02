import BaseLayout from "../components/BaseLayout";
//import '../app/globals.css';
import Card from "../components/Card";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function Profile(){
    return(
        <BaseLayout>
            <Card padding={'none'}>
                <div className="relative">
                    <div className="h-36 overflow-hidden flex justify-center items-center rounded-md">
                        <img src="/clay-banks-wueUmXl5TU0-unsplash.jpg" alt=""/>
                    </div>
                    <div className='absolute bottom-2 left-2'>
                        <h1 className='font-semibold text-2xl text-lTextPrimary dark:text-dTextPrimary'>Display Name</h1>
                    </div>
                </div>


            </Card>

            <Card>
                <div>
                    <h2>Your Interests</h2>
                    <div className="p-2 my-4 grow">
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={interestTags.map((option) => option.title)}
                            defaultValue={[interestTags[3].title]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <Chip color="primary" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Add your interests..."
                                />
                            )}
                        />
                    </div>
                </div>
            </Card>
        </BaseLayout>
    )
}

const interestTags = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
];
