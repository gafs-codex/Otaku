import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"
import SkeletonCard from "../ui/SkeletonCard"
import Error from "../ui/Error"

export default function Upcoming() {
    const [upcoming, setUpcoming] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setError("")
        setLoading(true)
        fetchAnime(`/seasons/upcoming`)
            .then((data) => {
                if (!data) {
                    setError("Couldn't load this section")
                    setLoading(false);
                    return
                }

                console.log(data);
                setUpcoming(data.slice(0, 15))
                setLoading(false)

            })
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

    if (error) {
        return <Error message={error} />;
    }
    return (
        <>
            {upcoming ? upcoming.map((anime) => {
                return (
                    <AnimeCard anime={anime} />
                )
            }) : []}
        </>
    )
}