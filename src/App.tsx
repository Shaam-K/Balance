import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import CreateArea from './Pages/CreateArea'
import Area from './Pages/Area'
import Dash from './Pages/Dash'
import CreateIssue from './Pages/CreateIssue'
import UpdateIssue from './Pages/UpdateIssue'
import DeleteIssue from './Pages/DeleteIssue'
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
            <Route path="/create-area/:id" element={<CreateArea />} />
            <Route path="/dash/" element={<Dash />} />
            <Route path="/dash/create/" element={<CreateIssue />} />
            <Route path="/edit/:areaId/:postId" element={<UpdateIssue />} />
            <Route path="/edit/:areaId/:postId" element={<DeleteIssue />} />
            <Route path="/dash/create/" element={<CreateIssue />} />
            <Route path="/area/:areaid" element={< Area />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
