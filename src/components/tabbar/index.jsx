import { useCallback, useState, forwardRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.scss'
const Tabbar = forwardRef((props, ref) => {
  const navigate = useNavigate()
  const location = useLocation()
  //  console.log(location, 'location')
  const itemClick = useCallback(path => {
    //    console.log(path)
    navigate(path)
  }, [])

  const [list, setList] = useState([
    {
      title: '首页',
      path: '/home',
      icon: 'icon-shouye',
    },
    {
      title: '分类',
      path: '/category',
      icon: 'icon-fenlei',
    },
    {
      title: '购物车',
      path: '/cart',
      icon: 'icon-gouwuche2',
    },
    {
      title: '我的',
      path: '/me',
      icon: 'icon-wode',
    },
  ])
  return (
    <div id={`tabbar`} ref={ref}>
      {list.map((item, index) => {
        return (
          <div
            className={`tabbar-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
            key={index}
            onClick={() => itemClick(item.path)}
          >
            <span className={`iconfont ${item.icon}`}></span>
            <span>{item.title}</span>
          </div>
        )
      })}
    </div>
  )
})

export default Tabbar
