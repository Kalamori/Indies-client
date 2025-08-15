import { Routes, Route } from "react-router-dom"
import  NavBar  from "./components/Navbar/NavBar.jsx"
import PrivateRoute from "./components/Routes/PrivateRoute.jsx"

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import MenusList from './pages/MenusList'
import MenuDetails from './pages/MenuDetails'
import CreateMenu from './pages/CreateMenu'
import EditMenu from './pages/EditMenu'
import CreateMenuItem from './pages/CreateMenuItem'
import EditMenuItem from './pages/EditMenuItem'

const App = () => {
  return (
        <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menus" element={<MenusList />} />
          <Route path="/menus/:id" element={<MenuDetails />} />
          <Route
            path="/menus/create"
            element={
              <PrivateRoute adminOnly={true}>
                <CreateMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="/menus/:id/edit"
            element={
              <PrivateRoute adminOnly={true}>
                <EditMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="/menus/:menuId/item/create"
            element={
              <PrivateRoute adminOnly={true}>
                <CreateMenuItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/menus/:menuId/item/:itemId/edit"
            element={
              <PrivateRoute adminOnly={true}>
                <EditMenuItem />
              </PrivateRoute>
            }
          />
        </Routes>
        </>
  )
}

export default App
