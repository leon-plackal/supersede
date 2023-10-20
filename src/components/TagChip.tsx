import React from "react"

type TagChipProps = {
    name: string;
    onRemoveTag: (tagName: string) => void;
};

//CALL BACK FUNCTION
export default function TagChip({ name, onRemoveTag }: TagChipProps) {

    return (
        <span
            className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300">
            {name}
            <button onClick={() => {
                onRemoveTag(name);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd" />
                </svg>
            </button>

        </span>
    )

}