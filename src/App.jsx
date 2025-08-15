import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Home from './pages/Home'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'
import PrivateRoute from './components/Routes/PrivateRoute'

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
