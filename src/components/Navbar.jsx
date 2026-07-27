import mainLogo from '../assets/Logo.svg'
import { Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {

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

                <div>
                    <button className='theme-btn'>
                        <Sun width={20} height={20} />
                    </button>
                </div>
            </div>
        </header>
    )
}