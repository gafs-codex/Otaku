import { Trash2 } from 'lucide-react';
import { Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function FavoritesPage() {
    return (
        <main className="favorites">
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>Favorites</h1>
                    <p>You have saved 0 animes</p>
                </div>


                <div>
                    <select name="" id=""></select>
                    <button></button>
                </div>
            </div>

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
        </main>
    )
}