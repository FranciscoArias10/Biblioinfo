import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Register from './pages/Register'
import ReviewList from './pages/ReviewList'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/lista" element={<ReviewList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
