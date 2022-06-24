import Tabbar from '@/components/tabbar/index.jsx'

import { useCallback, useEffect, useState } from 'react'

import { Swiper, SearchBar } from 'antd-mobile'

import { reqSwiperdata, reqNavData, reqFloordata } from '@/api/index.js'

import MyHeader from '@/components/my-header/index.jsx'
// 引入样式文件
import './index.scss'

function Home(props) {
  const [swiperData, setSwiperData] = useState([])
  const [navList, setNavList] = useState([])
  const [floorList, setFloorList] = useState([])
  // 获取首页轮播图数据
  useEffect(() => {
    ;(async () => {
      const [swiperRes, navRes, floorRes] = await Promise.all([
        reqSwiperdata(),
        reqNavData(),
        reqFloordata(),
      ])
      setSwiperData(swiperRes)
      setNavList(navRes)
      setFloorList(floorRes)
    })()
  }, [])

  const focus = useCallback(() => {
    console.log('触发焦点，跳转到搜索页面')
  }, [])

  const items = swiperData.map((item, index) => {
    return (
      <Swiper.Item key={index}>
        <img className={`img`} src={item.image_src} alt="" />
      </Swiper.Item>
    )
  })
  return (
    <div className={`home`}>
      <MyHeader title="首页" />
      <SearchBar placeholder="搜索" onFocus={() => focus()} />
      <Swiper>{items}</Swiper>
      <div className={`nav-wrapper`}>
        {navList.map((item, index) => {
          return (
            <div className={`nav-item`} key={index}>
              <img src={item.image_src} alt={item.name} />
            </div>
          )
        })}
      </div>
      <div className={`floor-wrapper`}>
        {floorList.map((floor, idx) => {
          return (
            <div className={`floor-item`} key={idx}>
              <div className={`img-wrapper`}>
                <img
                  src={floor.floor_title.image_src}
                  className={`img`}
                  alt={floor.floor_title.name}
                />
              </div>
              <div className={`content`}>
                <div className={`big-img-wrapper`}>
                  <img
                    src={floor.product_list[0].image_src}
                    alt={floor.product_list[0].name}
                  />
                </div>
                <div className={`small-img-wrapper`}>
                  {floor.product_list.slice(1).map((smallImg, index) => {
                    return (
                      <img
                        src={smallImg.image_src}
                        alt={smallImg.name}
                        key={index}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Tabbar />
    </div>
  )
}

export default Home
