import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

interface Game {
    id: number;
    name: string;
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect (() => {
        fetch("https://api.rawg.io/api/xgames?key=0de0dc61e00d4d6f8c278a8c38c1e83e&dates=2019-09-01,2019-09-30&platforms=18,1,7", {
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
            .catch(err => { setError("Request failed with status code " + err.status); })
            .finally(() => { setLoading(false); })
    }, []);
    
    return (
        <>
            {error && <Text>{error}</Text> }
            {loading && <Text>{loading}</Text>}
            <ul>
                {games.map(game => <li key={game.id}>{game.name}</li>)}
            </ul>
        </>
    )
}

export default GameGrid