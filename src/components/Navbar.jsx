import mainLogo from '../assets/Logo.svg'
import { Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
export default function Navbar() {

    return (
        <header>
            <div className='header'>
                <img className='logo' src={mainLogo} alt="crunchyroll logo" />

                <nav>
                    <ul>
                        <li>
                            <NavLink className="links" to="/">
                                Discover
                            </NavLink>
                        </li>

                        <li>
                            Search
                        </li>

                        <li>
                            <NavLink className="links" to="/favorites">
                                Favorites
                            </NavLink>
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