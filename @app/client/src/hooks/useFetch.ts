import { useState, useEffect } from "react";

// Custom hook to fetch data from an API
// simplified version 
// TODO declare type for options
//

function useFetch<T>(url: string, options?: any): { data: T | null, error: unknown, isError: boolean, loading: boolean } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (url: string, signal?: AbortSignal, options?: any) => {
        const res = await fetch(url, {
            signal,
            ...options
        });
        const json = await res.json();
        return json
    }

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            fetchData(url, signal).then((res) => setData(res));
        } catch (error) {
            setError(error);
            setIsError(true);
        } finally {
            setLoading(false);
        }
        return () => controller.abort();
    }, [url])

    return { data, error, isError, loading }
}

export default useFetch;