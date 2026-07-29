import mainLogo from '../assets/Logo.svg'
import { Sun, Moon, Menu, Heart, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    })

    useEffect(() => {
        document.body.classList.toggle("dark", dark);

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );
    }, [dark]);


    // function navStyle({ isActive }) {
    //     return {
    //         color: isActive ? "black" : "gray",
    //         backgroundColor: isActive ? "#FFDFF6" : "",
    //         padding: isActive ? "0.625rem 1.25rem" : "",
    //         borderRadius: isActive ? "1.25rem" : "",
    //         fontSize: isActive ? "0.85rem" : ""
    //     };
    // }

    return (
        <header>
            <div className='header'>
                <img className='logo' src={mainLogo} alt="crunchyroll logo" />

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "links active" : "links"} >
                                Discover
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? "links active" : "links"}
                                to="/search"
                            >
                                Search
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({ isActive }) => isActive ? "links active" : "links"} to="/favorites" >
                                Favorites
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className='menu'>
                    <NavLink className="fave-btn" to="/favorites">
                        <Heart height={20} width={20} />
                    </NavLink>

                    <button className='theme-btn' onClick={() => setDark(prev => !prev)}>
                        {dark ? <Sun width={20} height={20} /> : <Moon width={20} height={20} />}
                    </button>


                    <button className='menu-btn' onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
            
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "mobile-link active" : "mobile-link"
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    Discover
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive ? "mobile-link active" : "mobile-link"
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    Search
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "mobile-link active" : "mobile-link"
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    Favorites
                </NavLink>
            </div>
        </header>
    )
}