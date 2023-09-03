import Card from "../components/Card";
import Avatar from "../components/Avatar";
import {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

export default function PostCard({title, link, image, key, date, Source}){
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const inactiveNavStyle = "flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400"

    const showDiv = () => {
        setDropdownOpen(true)
    };
    const hideDiv = () => {
        setDropdownOpen(false);
    };
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    // the useEffect hook is used to attach and detach the click event listener to the document object
    useEffect(() => {
        if (dropdownOpen) {
            console.log(dropdownOpen)
            // Attach the click event listener to the document
            document.addEventListener('click', hideDiv);

            // Return a cleanup function to remove the event listener
            return () => {
                document.removeEventListener('click', hideDiv);
            };
        }
    }, [dropdownOpen]);

    return(
        <Card>
            <div className="flex gap-3 ">
                <div>
                    {/*<Link to='/profile'>*/}
                    {/*    <span className="cursor-pointer">*/}
                    {/*        <Avatar></Avatar>*/}
                    {/*    </span>*/}
                    {/*</Link>*/}
                </div>
                <div className="grow">
                    <p>
                        <Link to={'/profile'}>
                                <span className="mr-1 text-3xl font-semibold hover:underline hover:cursor-pointer">{title}</span>
                        </Link>

                    </p>
                    <p className="text-lTextSecondary dark:text-dTextSecondary text-sm">{date}</p>
                </div>
                <div>
                    <button className='flex items-center gap-2' onClick={() => openInNewTab(`${link}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"/></svg>
                        <div className='pb-1'>
                            {Source}
                        </div>
                    </button>
                </div>
                <div>
                    <button className="text-lTextPrimary dark:text-dTextPrimary" onClick={showDiv}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="relative">
                            <div className="absolute w-52 right-0 bg-lCardBg dark:bg-dCardBg2 shadow-md shadow-gray-400 dark:shadow-gray-900 p-3 rounded-md">
                                <a href="/" className={inactiveNavStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                    Save Post
                                </a>
                                <a href="/" className={inactiveNavStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Not Interested
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                {/*<p className="my-3 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi dolorum error hic illo inventore ipsa, iste itaque laborum maxime officiis provident, quam repellat similique soluta temporibus unde voluptas voluptatum.</p>*/}
                <div className="rounded-md mt-4 overflow-hidden">
                    <img src={image} alt=""/>
                </div>
            </div>

            <div className="mt-5 flex gap-7 justify-between">
                <button className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                </button>
                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                </button>
            </div>


        </Card>
    )
}