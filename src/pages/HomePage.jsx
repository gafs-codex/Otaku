import Hero from "../components/Hero"
import Main from "../components/Main"
export default function HomePage({ isFavorite, toggleFavorite }) {
    return (
        <>
            <Hero />
            <Main isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        </>
    )
}