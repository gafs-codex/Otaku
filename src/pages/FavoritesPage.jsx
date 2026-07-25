import { Trash2 } from 'lucide-react';
import { Heart } from 'lucide-react';

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
                <Heart />
                <h2>Your library is empty</h2>
                <p>Tap on the heart anime to save it here</p>
                <button className='hero-search'>
                    browse anime
                </button>
            </div>
        </main>
    )
}