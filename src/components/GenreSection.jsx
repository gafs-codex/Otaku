import TagButton from "../ui/TagButton";
import fetchAnime from "../utils/api";
import { useState, useEffect } from "react";


export default function GenreSection({ selectedGenre, setSelectedGenre }) {
    const [genre, setGenre] = useState([])

    useEffect(() => {

        const cached = localStorage.getItem("genres");

        if (cached) {
            setGenre(JSON.parse(cached));
            return;
        }
        fetchAnime(`/genres/anime`)
            .then((data) => {
                if (!data) return;
                console.log(data);
                setGenre(data)
                localStorage.setItem("genres", JSON.stringify(data))
            })
    }, [])
    return (
        <div className="genre-container">
            <TagButton
                active={selectedGenre === null}
                onClick={() => setSelectedGenre(null)}
            >
                All
            </TagButton>

            {genre ? genre.map((genre) => {
                return (
                    <TagButton key={genre.mal_id} active={selectedGenre === genre.mal_id} onClick={() => setSelectedGenre(genre.mal_id)}>
                        {genre.name}
                    </TagButton>
                )
            }) : []}
        </div>
    )
}