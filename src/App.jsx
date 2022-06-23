import { Outlet, NavLink, useRoutes } from 'react-router-dom'
import routes from './router/index.js'
function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
      {element}
      <Outlet />
    </div>
  )
}

export default App
