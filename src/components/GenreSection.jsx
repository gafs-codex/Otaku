import TagButton from "../ui/TagButton";
import fetchAnime from "../utils/api";
import { useState, useEffect } from "react";


export default function GenreSection() {
    const [genre, setGenre] = useState([])

    useEffect(() => {
        fetchAnime(`/genres/anime`)
            .then((data) => {
                console.log(data);
                setGenre(data)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])
    return (
        <div className="genre-container">
            {genre ? genre.map((genre) => {
                return (
                    <TagButton key={genre.mal_id}>
                        {genre.name}
                    </TagButton>
                )
            }) : []}
        </div>
    )
}