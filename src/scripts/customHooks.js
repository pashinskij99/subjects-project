import React, {useLayoutEffect, useState} from 'react';

export function useWindowSize() {
    const [isMobile, setIsMobile] = useState(false);
    useLayoutEffect(() => {
        function updateIsMobile() {
            setIsMobile(window.innerWidth <= 480);
        }
        window.addEventListener('resize', updateIsMobile);
        updateIsMobile();
        return () => window.removeEventListener('resize', updateIsMobile);
    }, []);
    if (isMobile) return '1';
    else return '0';
}