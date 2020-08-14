import { useState, useEffect } from 'react';
import { debounce as _debounce} from 'underscore';

const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
        }
        const handleWindowResizeDebounced = _debounce(handleWindowResize, 500);
        window.addEventListener('resize', handleWindowResizeDebounced);
        return () => window.removeEventListener('resize', handleWindowResizeDebounced);
    }, [])

    return { width };
}

export default useViewport;