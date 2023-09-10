import { useEffect, useState, useRef } from 'react';

export function useOnScreen(ref) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) => {
            // Use a threshold of 1.0 to trigger only when the entire element is visible
            setIsOnScreen(entry.isIntersecting && entry.intersectionRatio >= 1.0);
        }, {
            threshold: 1.0 // Set the threshold to 1.0
        });
    }, []);

    useEffect(() => {
        observerRef.current.observe(ref.current);

        return () => {
            observerRef.current.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}