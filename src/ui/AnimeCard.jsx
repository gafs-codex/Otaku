import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// function AnimeCard({ poster, title, year, type, isFavorite, onFavoriteClick, onClick }) {
function AnimeCard({ anime, isFavorite, toggleFavorite }) {
    return (

        <article className="anime-card">
            <Link to={`/anime/${anime.mal_id}`} className='anime-link'>
                <div className="poster-container">
                    <img src={anime?.images?.webp?.large_image_url} alt={anime?.title} className="poster" />

                    <button className="favorite-btn"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(anime)
                        }
                        }
                    >
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
            </Link>

        </article>

    )
}
export default AnimeCard;