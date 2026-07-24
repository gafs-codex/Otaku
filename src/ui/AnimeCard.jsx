import { Heart } from 'lucide-react';

// function AnimeCard({ poster, title, year, type, isFavorite, onFavoriteClick, onClick }) {
function AnimeCard({ anime, isFavorite, onFavoriteClick }) {
    return (
        <article className="anime-card">
            <div className="poster-container">
                <img src={anime?.images?.webp?.large_image_url} alt={anime?.title} className="poster" />

                <button className="favorite-btn" onClick={onFavoriteClick}>
                    <Heart color={isFavorite ? "#E5259A" : "black"} fill={isFavorite ? "#E5259A" : "none"} />
                </button>
            </div>

            <div className="anime-info">
                <h3>{anime?.title}</h3>

                <div className="anime-meta">
                    <span>{anime?.year}</span>

                    <span className="badge">{anime?.type}</span>
                </div>
            </div>
        </article>
    )
}
export default AnimeCard;