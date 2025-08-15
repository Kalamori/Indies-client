import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Home from './pages/Home'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
