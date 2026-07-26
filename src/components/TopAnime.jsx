import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import Error from "../ui/Error"

export default function TopAnime({ selectedGenre, isFavorite, toggleFavorite }) {
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
                setLoading(false);
            });
    }, [endpoint]);


    if (loading) {
        return (
            <>
                {Array.from({ length: 15 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </>
        );
    }

    if (error) {
        return <Error message={error} />;
    }
    return (
        <>
            {topAnime ? topAnime.map((anime) => {
                return (
                    <AnimeCard key={anime.mal_id} anime={anime} isFavorite={isFavorite.some(
                        item => item.mal_id === anime.mal_id
                    )}
                        toggleFavorite={toggleFavorite} />
                )
            }) : []}
        </>
    )
}