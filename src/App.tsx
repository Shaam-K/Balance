import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
function App() {

  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enter" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
