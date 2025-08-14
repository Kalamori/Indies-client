import { Routes, Route } from 'react-router'
import NavBar from './components/Navbar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import './App.css'

const App = () => {
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>

    </>
  )
}

export default App
