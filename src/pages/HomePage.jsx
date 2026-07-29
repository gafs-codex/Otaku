import { useRef } from "react";
import Hero from "../components/Hero"
import Main from "../components/Main"
export default function HomePage({ isFavorite, toggleFavorite }) {
    const topAnimeRef = useRef(null);

    return (
        <>
            <Hero topAnimeRef={topAnimeRef} />
            <Main topAnimeRef={topAnimeRef} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        </>
    )
}