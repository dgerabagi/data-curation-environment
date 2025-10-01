// src/client/views/parallel-copilot.view/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

// A custom hook to debounce a value.
// It will only update the returned value after the specified delay has passed without the input value changing.
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if the value changes before the delay has passed
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Only re-run the effect if value or delay changes

    return debouncedValue;
}