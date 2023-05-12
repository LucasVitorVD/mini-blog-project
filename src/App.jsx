import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { useState, useEffect } from "react"
import { useAuthentication } from "./hooks/useAuthentication"
import { onAuthStateChanged } from "firebase/auth"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewPost from "./pages/NewPost"
import Register from "./pages/Register"
import PostContent from "./pages/PostContent"
import Edit from "./pages/Edit"
import Search from "./pages/Search"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="container">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
        <Navbar />
          <main className="container__main_content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/newpost" element={user ? <NewPost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/posts/:id" element={<PostContent />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts/edit/:id" element={<Edit />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App