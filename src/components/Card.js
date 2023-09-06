/**
 * A reusable card component that can be expanded when clicked.
 *
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content of the card.
 * @param {string} props.padding - Padding style for the card ('none' for no padding).
 * @param {string} props.colour - Background color for the card.
 */
export default function Card({ children, padding, colour }) {
    // Define default padding and background color classes
    let pad = 'p-3 md:p-4';
    if (padding === 'none') {
        pad = '';
    }
    let bgColor = 'bg-lCardBg';
    if (colour) {
        bgColor = `bg-${colour}`;
    }

    // Function to close the expanded card
    const closeExpandedCard = (card, cardClone, topY) => {
        cardClone.style.transition = 'opacity 450ms ease-in-out';
        cardClone.style.opacity = '0';

        // Set the original card's opacity back to 1
        card.style.opacity = '1';
        cardClone.addEventListener('transitionend', () => {
            cardClone.parentNode.removeChild(cardClone);
        });

        const topDiv = card.parentNode;
        topDiv.style.display = 'block'
        //card.scrollIntoView(false)
        const scrollPos = card.offsetTop - 80;
        window.scrollTo({top: scrollPos, behavior: 'instant'});
    };

    // Function to expand the card when clicked
    const expandCard = async (e) => {
        const card = e.currentTarget;
        const cardClone = card.cloneNode(true);
        const { top, left, width, height } = card.getBoundingClientRect();

        // Set initial styles for the cloned card
        cardClone.style.position = 'fixed';
        cardClone.style.top = top + 'px';
        cardClone.style.left = left + 'px';
        cardClone.style.width = width + 'px';
        cardClone.style.height = height + 'px';

        // Adjust styles for the inner content
        const firstDiv = cardClone.firstChild;
        firstDiv.style.maxWidth = '35rem';
        firstDiv.style.margin = 'auto';

        card.style.opacity = '0';
        card.parentNode.parentNode.appendChild(cardClone);
        const topDiv = card.parentNode;
        topDiv.style.display = 'none'

        // Apply transitions for the expansion animation
        cardClone.style.transition = `
              width 350ms ease-in-out,
              height 350ms ease-in-out,
              left 350ms ease-in-out,
              top 350ms ease-in-out
            `;

        // Use setTimeout to set new styles after transitions are applied
        setTimeout(() => {
            cardClone.style.top = '4rem';
            cardClone.style.left = 0;
            cardClone.style.width = '100vw';
            cardClone.style.height = '100vh';

            // Create and append the close button to the firstDiv
            const closeButton = document.createElement('button');
            closeButton.style = `
                position: absolute;
                z-index: 100;
                top: 20px;
                left: -20px;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #dedede;
              `;

            // Create the SVG element for the close button
            const svgElement = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgElement.setAttribute('fill', 'none');
            svgElement.setAttribute('viewBox', '0 0 24 24');
            svgElement.setAttribute('stroke-width', '1.5');
            svgElement.setAttribute('stroke', '#000');
            svgElement.setAttribute('class', 'w-4 h-4');

            // Create the path element and set its attributes
            const pathElement = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            pathElement.setAttribute('stroke-linecap', 'round');
            pathElement.setAttribute('stroke-linejoin', 'round');
            pathElement.setAttribute(
                'd',
                'M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
            );

            // Append the path element to the SVG element
            svgElement.appendChild(pathElement);

            // Append the SVG element to the closeButton
            closeButton.appendChild(svgElement);

            // Append the close button to the card
            firstDiv.appendChild(closeButton);

            // Event listener to close the expanded card when the close button is clicked
            closeButton.addEventListener('click', () => {
                closeExpandedCard(card, cardClone, top);
                closeButton.remove();
            });
        }, 0);
    };

    return (
        <div
            className={`${bgColor} dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md`}
            onClick={expandCard}
        >
            <div className={`transition-all duration-500 ${pad} mb-5 relative`}>
                {children}
            </div>
        </div>
    );
}
