import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AnimePage from "./pages/AnimePage"
import FavoritesPage from "./pages/FavoritesPage"
import SearchPage from "./pages/SearchPage"
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
function App() {
  const [isFavorite, setIsFavorite] = useState([])
  // const [darkMode, setDarkMode] = useState(() => {
  //   return localStorage.getItem("theme") === "dark";
  // })


  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   }
  //   else {
  //     document.body.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode])
  function clearFavorites() {
    const confirmed = window.confirm(
      "Remove all favorite anime?"
    );

    if (confirmed) {
      setIsFavorite([]);
    }

  }

  function toggleFavorite(anime) {
    setIsFavorite(prev => {
      const exist = prev.some(item => item.mal_id === anime.mal_id)
      if (exist) {
        return prev.filter(item => item.mal_id !== anime.mal_id)
      }
      return [...prev, anime]
    })
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<FavoritesPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} clearFavorites={clearFavorites} />} />
          <Route path="/anime/:id" element={<AnimePage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
          <Route path="/search" element={<SearchPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
