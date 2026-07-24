import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"

export default function NowAiring() {
    const [airingAnime, setAiringAnime] = useState([])
    const [isFavorite, setIsFavorite] = useState([])
    useEffect(() => {
        fetchAnime(`/seasons/now`)
            .then((data) => {
                console.log(data);
                setAiringAnime(data.slice(0, 15))
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