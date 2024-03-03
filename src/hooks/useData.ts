import { useEffect, useState } from "react";

const useData = <T>(endpoint: string, requestConfig?: object, deps?: unknown[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect (() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const controller = new AbortController();

                const url = new URL("https://api.rawg.io/api" + endpoint);
                url.searchParams.append('key', '0de0dc61e00d4d6f8c278a8c38c1e83e');

                if (requestConfig) {
                    Object.entries(requestConfig).forEach(([k, v]) => {
                        if(v !== undefined) {
                            url.searchParams.append(k, String(v));
                        }
                    });
                }

                const response = await fetch(url.toString(), {
                    signal: controller.signal,
                    method: "GET",
                    mode: "cors"
                });

                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData.results);
                } else {
                    throw new Error(`Request failed with status code ${response.status}`);
                }
            } catch (error) {
                setError(error.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // Cleanup function to abort the fetch request if the component unmounts
            const controller = new AbortController();
            controller.abort();
        };
    }, deps ? [...deps] : []);

    return { data, error, isLoading };
};

export default useData;