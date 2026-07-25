import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
