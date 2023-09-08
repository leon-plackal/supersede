import {useState} from "react";

/**
 * A reusable card component that can be expanded when clicked.
 *
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content of the card.
 * @param {string} props.padding - Padding style for the card ('none' for no padding).
 * @param {string} props.colour - Background color for the card.
 */
export default function Card({ children, padding, colour, expand }) {
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

    const expandCard =  (e) => {
        if (!expand) {
            console.log("Not an expandable card!");
            return;
        }
        const card = e.currentTarget;

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
            const firstDiv = card.firstChild;
            firstDiv.style.maxWidth = '35rem';
            firstDiv.style.margin = 'auto';
        },0)
        setIsExpanded(true);
    };


    const closeExpandedCard = (e) => {
        e.stopPropagation()
        const card = e.currentTarget.parentNode.parentNode;
        card.style.position = ''
        card.style.top = '';
        card.style.left = '';
        card.style.width = '';
        card.style.height = '';

        setTimeout(() => {
            const firstDiv = card.firstChild;
            firstDiv.style.maxWidth = '';
            firstDiv.style.margin = '';
        },0)

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
