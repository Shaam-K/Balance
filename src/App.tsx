import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { AuthContextProvider } from './context/AuthContext'
function App() {

  return (
    <ThemeProvider>
      <Router>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enter" element={<Login />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
