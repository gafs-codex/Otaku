import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import Error from "../ui/Error"

export default function NowAiring() {
    const [airingAnime, setAiringAnime] = useState([])
    const [isFavorite, setIsFavorite] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        setLoading(true)
        setError("")
        fetchAnime(`/seasons/now`)
            .then((data) => {
                if (!data) {
                    setError("Couldn't load this section")
                    setLoading(false);
                    return
                }
                console.log(data);
                setAiringAnime(data.slice(0, 15))
                setLoading(false)
            })
    }, [])

    function onFavoriteClick(anime) {
        setIsFavorite(prev => {
            const alreadyFavorite = prev.includes(anime.mal_id)
            if (alreadyFavorite) {
                return prev.filter(id => id !== anime.mal_id)
            }
            return [...prev, anime.mal_id]
        })
    }
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
            {airingAnime ? airingAnime.map((anime) => {
                return (
                    <AnimeCard key={anime.mal_id} anime={anime} isFavorite={isFavorite.includes(anime.mal_id)} onFavoriteClick={() => onFavoriteClick(anime)} />
                )
            }) : []
            }
        </>

    )
}