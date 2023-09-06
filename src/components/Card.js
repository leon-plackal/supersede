import {useState} from "react";

export default function Card({children, padding, colour}){
    let pad = 'p-3 md:p-4'
    if (padding === 'none'){
        pad = ''
    }
    let bgColor = 'bg-lCardBg';
    if(colour){
        bgColor = `bg-${colour}`
    }

    const closeExpandedCard = (card, cardClone) => {
        cardClone.style.transition = 'opacity 450ms ease-in-out';
        cardClone.style.opacity = '0';

        // Set the original card's opacity back to 1
        card.style.opacity = '1';
        cardClone.addEventListener('transitionend', () => {
            cardClone.parentNode.removeChild(cardClone);
        });

    };


    const expandCard = async (e) => {
        const card = e.currentTarget;
        const cardClone = card.cloneNode(true);
        const { top, left, width, height } = card.getBoundingClientRect();

        cardClone.style.position = 'fixed';
        cardClone.style.top = top + 'px';
        cardClone.style.left = left + 'px';
        cardClone.style.width = width + 'px';
        cardClone.style.height = height + 'px';
        card.style.opacity = '0';
        card.parentNode.appendChild(cardClone);

        const closeButton = document.createElement('button');
        closeButton.style = `
        position: fixed;
        z-index: 100;
        top: 35px;
        right: 35px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #222;
        `;

        // Apply transitions
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
            cardClone.style.background = '#0f172a';

            // Create and append the close button
            const closeButton = document.createElement('button');
            closeButton.style = `
      position: fixed;
      z-index: 100;
      top: 35px;
      right: 35px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fff;
    `;
            document.body.appendChild(closeButton);
            closeButton.addEventListener('click', () => {
                closeExpandedCard(card, cardClone);
                closeButton.remove();
            });
        }, 0);

    }

    return (
        <div className='cursor-pointer ' onClick={expandCard}>
            <div className={`overflow-hidden h-full max-w-xl m-auto transition-all duration-500 ${bgColor} dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md ${pad} mb-5`}>
                {children}
            </div>
        </div>
    );
}