import Card from "../components/Card";
import Avatar from "../components/Avatar";
import {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

export default function PostCard({title, link, image, key}){
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const inactiveNavStyle = "flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400"

    const showDiv = () => {
        setDropdownOpen(true);
    };

    const hideDiv = () => {
        setDropdownOpen(false);
    };

    // the useEffect hook is used to attach and detach the click event listener to the document object
    useEffect(() => {
        if (dropdownOpen) {
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
                    <Link to='/profile'>
                        <span className="cursor-pointer">
                            <Avatar></Avatar>
                        </span>
                    </Link>
                </div>
                <div className="grow">
                    <p>
                        <Link to={'/profile'}>
                                <span className="mr-1 font-semibold hover:underline hover:cursor-pointer">{title}</span>
                        </Link>
                        shared a
                        <span className="text-socialBlue"> post</span>

                    </p>
                    <p className="text-lTextSecondary dark:text-dTextSecondary text-sm">2 hours ago</p>
                </div>
                <div>
                    <button onClick={() => openInNewTab(`${link}`)}>
                        Source
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
                <p className="my-3 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi dolorum error hic illo inventore ipsa, iste itaque laborum maxime officiis provident, quam repellat similique soluta temporibus unde voluptas voluptatum.</p>
                <div className="rounded-md overflow-hidden">
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