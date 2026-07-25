import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import Error from "../ui/Error"

export default function TopAnime({ selectedGenre }) {
    const [topAnime, setTopAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    console.log("Selected Genre:", selectedGenre);
    const endpoint = selectedGenre ? `/anime?genres=${selectedGenre}&limit=15` : `/top/anime?limit=15`

    console.log(endpoint);

    useEffect(() => {
        setError("")
        setLoading(true)
        fetchAnime(endpoint)
            .then((data) => {
                if (!data) {
                    setError("Couldn't load this section")
                    setLoading(false);
                    return
                }
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