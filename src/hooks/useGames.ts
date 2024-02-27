import { useEffect, useState } from 'react'

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);


    useEffect (() => {
        const controller = new AbortController();

        setLoading(true);
        fetch("https://api.rawg.io/api/games?key=0de0dc61e00d4d6f8c278a8c38c1e83e&dates=2019-09-01,2019-09-30&platforms=18,1,7", {
            signal: controller.signal,
            method: "GET",
            mode: "cors"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => { setGames(data.results); setLoading(false); })
            .catch(err => { if(err.status) setError("Request failed with status code " + err.status); setLoading(false); })
            return () => controller.abort();
    }, []);
    
    return { games, error, isLoading }
}

export default useGames