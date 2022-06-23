import Home from '../pages/home/index.jsx'
import Category from '../pages/category/index.jsx'
import Cart from '../pages/cart/index.jsx'
import Me from '../pages/me/index.jsx'
import { Navigate } from 'react-router-dom'
const routes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/me',
    element: <Me />,
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
]

export default routes
