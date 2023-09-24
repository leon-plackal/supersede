import React, { useState, ReactNode } from "react";

/**
 * A reusable card component that can be expanded when clicked.
 *
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content of the card.
 * @param {string} props.padding - Padding style for the card ('none' for no padding).
 * @param {string} props.colour - Background color for the card.
 * @param {boolean} props.expand - Whether the card can be expanded.
 */
export default function Card({ children, padding, colour, expand }: {
    children: ReactNode;
    padding: string;
    colour: string;
    expand: boolean;
}) {
    // Define default padding and background color classes
    let pad = 'p-3 md:p-4';
    if (padding === 'none') {
        pad = '';
    }
    let bgColor = 'bg-lCardBg';
    if (colour) {
        bgColor = `bg-${colour}`;
    }

    const [isExpanded, setIsExpanded] = useState(false);

    const expandCard = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!expand) {
            console.log("Not an expandable card!");
            return;
        }
        const card = e.currentTarget as HTMLDivElement;

        // Prevent scrolling of body
        document.body.style.overflow = "hidden";

        // Get current position of the card to animate from
        const { top, left, width, height } = card.getBoundingClientRect();

        // Set initial styles for the card
        card.style.position = 'fixed';
        card.style.top = top + 'px';
        card.style.left = left + 'px';
        card.style.width = width + 'px';
        card.style.height = height + 'px';

        setTimeout(() => {
            card.style.top = '4rem';
            card.style.left = '0';
            card.style.width = '100vw';
            card.style.height = '100vh';
            const firstDiv = card.firstChild as HTMLDivElement;
            firstDiv.style.maxWidth = '35rem';
            firstDiv.style.margin = 'auto';
        }, 0);
        setIsExpanded(true);
    };

    const closeExpandedCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const card = e.currentTarget.parentNode?.parentNode as HTMLDivElement;
        card.style.position = '';
        card.style.top = '';
        card.style.left = '';
        card.style.width = '';
        card.style.height = '';

        document.body.style.overflow = "auto";

        setTimeout(() => {
            const firstDiv = card.firstChild as HTMLDivElement;
            firstDiv.style.maxWidth = '';
            firstDiv.style.margin = '';
        }, 0);

        setIsExpanded(false);
    };

    const cardClassName = `... ${isExpanded ? 'card-expanded' : ''}`;

    return (
        <div
            className={`${bgColor} ${cardClassName} dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md`}
            onClick={expandCard}
        >
            <div className={`transition-all duration-500 ${pad} mb-5 relative`}>
                {children}
                {isExpanded && (
                    <button
                        className="close-button" // Add your close button styles here
                        onClick={closeExpandedCard}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}
