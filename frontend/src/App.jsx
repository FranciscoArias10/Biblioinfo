import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Register from './pages/Register'
import ReviewList from './pages/ReviewList'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/lista" element={<ReviewList />} />
          <Route path="/libro/:id" element={<BookDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
