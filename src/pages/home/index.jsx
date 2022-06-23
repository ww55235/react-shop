import { useEffect, useState } from 'react'

import { reqSwiperdata } from '../../api/index.js'
function Home(props) {
  const [swiperData, setSwiperData] = useState([])
  // 获取首页轮播图数据
  useEffect(() => {
    ;(async () => {
      console.log('获取轮播图数据....')
      const result = await reqSwiperdata()
      console.log(result, 'result')
    })()
  })
  return <div>我是首页</div>
}

export default Home
