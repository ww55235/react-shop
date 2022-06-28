import { Outlet, NavLink, useRoutes, useLocation } from 'react-router-dom'
import routes from './router/index.js'
import TabBar from './components/tabbar'

function App() {
  const location = useLocation()
  const showTabBar = ['/home', '/category', '/cart', '/me'].includes(
    location.pathname
  )
  const element = useRoutes(routes)
  return (
    <div className="App">
      {element}
      <Outlet />
      {showTabBar && <TabBar />}
    </div>
  )
}

export default App
