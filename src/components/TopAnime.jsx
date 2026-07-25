import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"

export default function TopAnime({ selectedGenre }) {
    const [topAnime, setTopAnime] = useState([])

    console.log("Selected Genre:", selectedGenre);
    const endpoint = selectedGenre ? `/anime?genres=${selectedGenre}&limit=15` : `/top/anime?limit=15`

    console.log(endpoint);

    useEffect(() => {
        fetchAnime(endpoint)
            .then((data) => {
                console.log("Returned data:", data);
                setTopAnime(data || []);
            });
    }, [endpoint]);
    return (
        <>
            {topAnime ? topAnime.map((anime) => {
                return (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                )
            }) : []}
        </>
    )
}