import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import GatewayError from "../Errors/GatewayError"
import RequestOverload from "../Errors/RequestOverload"
import NoInternet from "../Errors/NoInternet"
import FailedRequest from "../Errors/FailedRequest"

export default function TopAnime({ selectedGenre, isFavorite, toggleFavorite, topAnimeRef }) {
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
                console.log("Returned data:", data);
                setTopAnime(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            })
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

    if (error === "too-many-requests") {
        return <div className="error-wrapper"><RequestOverload /></div>;
    }

    if (error === "gateway-timeout") {
        return <div className="error-wrapper"><GatewayError /></div>;
    }

    if (error === "offline") {
        return <div className="error-wrapper"><NoInternet /></div>;
    }

    if (error === "request-failed") {
        return <div className="error-wrapper"><FailedRequest /></div>;
    }
    return (
        <div className="anime-grid">

            {topAnime ? topAnime.map((anime) => {
                return (
                    <AnimeCard key={anime.mal_id} anime={anime} isFavorite={isFavorite.some(
                        item => item.mal_id === anime.mal_id
                    )}
                        toggleFavorite={toggleFavorite} />
                )
            }) : []}

        </div>
    )
}