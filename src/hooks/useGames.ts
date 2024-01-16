import { useEffect, useState } from 'react'

interface Game {
    id: number;
    name: string;
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect (() => {
        const controller = new AbortController();

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
            .then(data => { setGames(data.results); })
            .catch(err => { if(err.status) setError("Request failed with status code " + err.status); })
            return () => controller.abort();
    }, []);
    
    return { games, error }
}

export default useGames