import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { NavBar } from 'antd-mobile'
import { reqCategoryData } from '@/api'
import { TOP_HEIGHT, TABBAR_HEIGHT } from '@/constants'

import Scroll from '@/components/scroll'

function Category(props) {
  const menuRef = useRef(null)
  const goodsRef = useRef(null)
  const [categoryList, setCategoryList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [goodsElements, setGoodsElements] = useState([])

  const [goodsCateClientHeights, setGoodsCateClientHeights] = useState([])

  const location = useLocation()

  const navigate = useNavigate()

  const back = useCallback(() => {
    navigate(-1)
  }, [])

  // 获取数据
  useEffect(() => {
    ;(async () => {
      const result = await reqCategoryData()
      setCategoryList(result)
    })()
  }, [])

  // 获取区块的高度
  useEffect(() => {
    const clientHeights = [0]
    const children = Array.from(
      document.querySelector('.goods-wrapper-scroll').children
    )
    if (!children.length) {
      return
    }

    children.reduce((prevHeight, child) => {
      let nextHeight = prevHeight + child.clientHeight
      clientHeights.push(nextHeight)
      return nextHeight
    }, 0)
    setGoodsElements(children)
    setGoodsCateClientHeights(clientHeights)
    menuRef.current.refresh()
    goodsRef.current.refresh()
  }, [categoryList])

  // index 索引改变了滚动到对应的goods-wrapper
  const menuClick = index => {
    const element = goodsElements[index]
    goodsRef.current.scrollToElement(element, 300)
  }

  const onScroll = useCallback(
    pos => {
      const scrollY = -pos.y
      for (let i = 0; i < goodsCateClientHeights.length - 1; i++) {
        const prevHeight = goodsCateClientHeights[i]
        const nextHeight = goodsCateClientHeights[i + 1]
        if (scrollY >= prevHeight && scrollY <= nextHeight) {
          setCurrentIndex(i)
        }
      }
    },
    [goodsCateClientHeights]
  )

  return (
    <div className="category">
      <NavBar onBack={back}>分类</NavBar>
      <div
        className={`content-body`}
        style={{ height: `calc(100vh - ${TOP_HEIGHT + TABBAR_HEIGHT}px)` }}
      >
        <Scroll className={`menu-wrapper`} ref={menuRef}>
          {categoryList.map((item, index) => (
            <div
              className={`menu-item ${currentIndex === index ? 'active' : ''}`}
              key={index}
              onClick={() => menuClick(index)}
            >
              {item.cat_name}
            </div>
          ))}
        </Scroll>
        <Scroll className={`goods-wrapper`} ref={goodsRef} onScroll={onScroll}>
          <div className={`goods-wrapper-scroll`}>
            {categoryList.map((item, idx) => (
              <div key={idx}>
                {item.children.map((item2, idx2) => (
                  <div className={`goods-item`} key={idx2}>
                    <header className={`title`}>/ {item2.cat_name} /</header>
                    <div className={`goods-item-wrapper`}>
                      {item2.children?.map((item3, idx3) => (
                        <div
                          className={`goods`}
                          key={idx3}
                          onClick={() =>
                            navigate('/goods-list?' + 'cat_id=' + item3.cat_id)
                          }
                        >
                          <div className="cover">
                            <img
                              src={item3.cat_icon}
                              alt={item3.cat_name}
                              loading="lazy"
                            />
                          </div>
                          <span>{item3.cat_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Scroll>
      </div>
    </div>
  )
}

export default Category
