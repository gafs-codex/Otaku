import mainLogo from '../assets/Logo.svg'
import { Sun } from 'lucide-react';
export default function Navbar() {

    return (
        <header>
            <div className='header'>
                <img className='logo' src={mainLogo} alt="crunchyroll logo" />

                <nav>
                    <ul>
                        <li>
                            Discover
                        </li>

                        <li>
                            Search
                        </li>

                        <li>
                            Favorites
                        </li>
                    </ul>
                </nav>

                <div>
                    <button className='theme-btn'>
                        <Sun width={20} height={20} />
                    </button>
                </div>
            </div>
        </header>
    )
}