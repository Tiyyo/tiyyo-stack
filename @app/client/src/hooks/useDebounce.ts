import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): Promise<T> {
    const [debouncedValue, setDebouncedValue] = useState<T>("112")
    // console.log(delay);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])


    return new Promise((resolve, reject) => {
        resolve('12')
    })
}