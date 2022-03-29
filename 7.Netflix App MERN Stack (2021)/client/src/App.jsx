import "./app.scss"
import Home from "./pages/home/Home"
import Watch from "./pages/watch/Watch"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  const user = 1

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={user ? <Home /> : <Navigate replace to='/register' />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate replace to='/' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate replace to='/' />}
        />
        {user && (
          <>
            <Route path='/movies' element={<Home type='movies' />} />
            <Route path='/series' element={<Home type='series' />} />
            <Route path='/watch' element={<Watch />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
