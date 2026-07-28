import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import Error from "../ui/Error"

export default function Upcoming({ isFavorite, toggleFavorite }) {
    const [upcoming, setUpcoming] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setError("")
        setLoading(true)
        fetchAnime(`/seasons/upcoming`)
            .then((data) => {
                console.log(data);
                setUpcoming(data.slice(0, 15))
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            }
            )
    }, [])

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
        <>
            {upcoming ? upcoming.map((anime) => {
                return (
                    <AnimeCard anime={anime} isFavorite={isFavorite.some(item => item.mal_id === anime.mal_id)} toggleFavorite={toggleFavorite} />
                )
            }) : []}
        </>
    )
}