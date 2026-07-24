import fetchAnime from "../utils/api"
import { useState, useEffect } from "react"
import AnimeCard from "../ui/AnimeCard"

export default function Upcoming() {
    const [upcoming, setUpcoming] = useState([])

    useEffect(() => {
        fetchAnime(`/seasons/upcoming`)
            .then((data) => {
                console.log(data);
                setUpcoming(data.slice(0, 15))
            })
    }, [])
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