import { Trash2 } from 'lucide-react';
import { Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import AnimeCard from '../ui/AnimeCard';

export default function FavoritesPage({ isFavorite, toggleFavorite, clearFavorites }) {
    const [sortBy, setSortBy] = useState("default");

    const sortedFavorites = [...isFavorite];

    if (sortBy === "title-asc") {
        sortedFavorites.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }
    else if (sortBy === "title-desc") {
        sortedFavorites.sort((a, b) =>
            b.title.localeCompare(a.title)
        );
    }
    else if (sortBy === "newest") {
        sortedFavorites.sort((a, b) =>
            (b.year || 0) - (a.year || 0)
        );
    }
    else if (sortBy === "oldest") {
        sortedFavorites.sort((a, b) =>
            (a.year || 0) - (b.year || 0)
        );
    }

    return (
        <main className="favorites">
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>Favorites</h1>
                    <p>You have saved {isFavorite.length} animes</p>
                </div>


                {isFavorite.length > 0 && (
                    <div className='affect-favorites'>
                        <select className='filter-favorites' name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="default" className='opt'>Default</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>

                        </select>
                        <button onClick={clearFavorites}>
                            <Trash2 color='red' width={20} height={20} />
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {isFavorite.length === 0 &&
                (
                    <div className='saved-favorites'>
                        <Heart width={40} height={40} color='#6b5e6e' />
                        <h2>Your library is empty</h2>
                        <p>Tap on the heart anime to save it here</p>
                        <NavLink to="/" style={{ marginTop: "1.25rem", color: "red" }}>
                            <button>
                                browse anime
                            </button>
                        </NavLink>
                    </div>
                )
            }

            {isFavorite.length > 0 &&
                (
                    <div className='anime-grid'>
                        {sortedFavorites.map((anime) => {
                            return (
                                <AnimeCard
                                    key={anime.mal_id}
                                    anime={anime}
                                    isFavorite={true}
                                    toggleFavorite={toggleFavorite}
                                />
                            )
                        })}
                    </div>
                )
            }
        </main>
    )
}