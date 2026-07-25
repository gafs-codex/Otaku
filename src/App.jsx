import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import FavoritesPage from "./pages/FavoritesPage"
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
