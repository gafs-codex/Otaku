import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AnimePage from "./pages/AnimePage"
import FavoritesPage from "./pages/FavoritesPage"
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom"
import { useState } from "react"
function App() {
  const [isFavorite, setIsFavorite] = useState([])

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
