import React from "react"

export default function Tooltip({ content }: { content: string }) {
    return (<div className="hidden md:block">
        <div className="group flex relative">
            <span className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            </span>
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 w-56 text-xs text-gray-100 rounded-md absolute left-1/2 
    translate-x-3 -translate-y-8 opacity-0 m-4 mx-auto">{content}</span>
        </div>
    </div>
    )
}