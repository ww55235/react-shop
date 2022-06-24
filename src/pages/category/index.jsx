import Tabbar from '@/components/tabbar/index.jsx'
import './index.scss'
import MyHeader from '@/components/my-header/index.jsx'
import { reqCategoryData } from '@/api'
import { useEffect, useState, useRef, useCallback } from 'react'
import BScroll from 'better-scroll'
import { useLocation, useNavigate } from 'react-router-dom'

function Category(props) {
  const [categoryList, setCategoryList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contentBodyHeight, setContentBodyHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  // 商品分类对应区块的高度
  //const [goodsCateClientHeights, setGoodsCateClientHeights] = useState([])
  const menuScrollInstanceRef = useRef(null)
  //menu区域滚动 BS实例
  const scrollWrapperRef = useRef(null)
  // 头部组件Ref
  const headerRef = useRef(null)

  const tabbarRef = useRef(null)

  const clientHeightsRef = useRef(null)

  const goodsWrapperScrollRef = useRef(null)

  const goodsWrapperScrollInstance = useRef(null)

  const location = useLocation()

  const navigate = useNavigate()

  // 获取数据
  useEffect(() => {
    ;(async () => {
      const result = await reqCategoryData()
      setCategoryList(result)
      console.log(categoryList, 'categoryList ttt')
    })()
  }, [])

  // 获取区块的高度
  useEffect(() => {
    const clientHeights = []
    const children = document.querySelector('.goods-wrapper-scroll').children
    let height = 0
    clientHeights.push(height)
    ;[...children].forEach(child => {
      height += child.clientHeight
      clientHeights.push(height)
    })
    if (clientHeightsRef.current?.length > 0) {
      return
    }
    clientHeightsRef.current = clientHeights
  }, [categoryList])

  // index 索引改变了滚动到对应的goods-wrapper
  useEffect(() => {
    if (!goodsWrapperScrollInstance.current) {
      return
    }
    //   console.log(goodsWrapperScrollInstance.current, 'curr')
    const element = document.querySelector('.goods-wrapper-scroll').children[
      currentIndex
    ]
    goodsWrapperScrollInstance.current?.scrollToElement(element, 300)
  }, [currentIndex])

  // 初始化
  useEffect(() => {
    const clientHeight = window.innerHeight
    const height =
      clientHeight -
      (headerRef.current.clientHeight + tabbarRef.current.clientHeight)
    setContentBodyHeight(height)
    goodsWrapperScrollRef.current.height = height + 'px'
    goodsWrapperScrollInstance.current = new BScroll(
      goodsWrapperScrollRef.current,
      {
        click: true,
        observeDOM: true,
        scrollY: true,
        probeType: 2,
      }
    )
    goodsWrapperScrollInstance.current.on('scroll', pos => {
      // setScrollY(-pos.y)
      const scrollY = -pos.y
      const goodsCateClientHeights = clientHeightsRef.current
      // console.log(goodsCateClientHeights, 'goodsCateClientHeights')
      for (let i = 0; i < goodsCateClientHeights.length - 1; i++) {
        const prevHeight = goodsCateClientHeights[i]
        const nextHeight = goodsCateClientHeights[i + 1]
        if (scrollY >= prevHeight && scrollY <= nextHeight) {
          setCurrentIndex(i)
        }
      }
    })
    menuScrollInstanceRef.current = new BScroll(scrollWrapperRef.current, {
      click: true,
      observeDOM: true,
      scrollY: true,
      probeType: 2,
    })
  }, [])
  // better-scroll 滚动事件
  // const goodsWrapperScrollInstanceScrollHandle = pos => {
  //   // setScrollY(-pos.y)
  //   const scrollY = -pos.y
  //   console.log(goodsCateClientHeights, 'goodsCateClientHeights')
  //
  //   for (let i = 0; i < goodsCateClientHeights.length - 1; i++) {
  //     const prevHeight = goodsCateClientHeights[i]
  //     const nextHeight = goodsCateClientHeights[i + 1]
  //     if (scrollY >= prevHeight && scrollY <= nextHeight) {
  //       setCurrentIndex(i)
  //     }
  //   }
  // }
  return (
    <div className="category">
      <MyHeader title="分类" ref={headerRef} />
      <div
        className={`content-body`}
        style={{
          height: contentBodyHeight + 'px',
        }}
      >
        <div className={`scroll-wrapper`} ref={scrollWrapperRef}>
          <div className={`menu-wrapper`}>
            {categoryList.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    currentIndex === index ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                >
                  {item.cat_name}
                </div>
              )
            })}
          </div>
        </div>
        <div className={`goods-wrapper`} ref={goodsWrapperScrollRef}>
          <div className={`goods-wrapper-scroll`}>
            {categoryList.map((item, idx) => {
              return (
                <div key={idx}>
                  {item.children.map((item2, idx2) => {
                    return (
                      <div className={`goods-item`} key={idx2}>
                        <header className={`title`}>
                          / {item2.cat_name} /
                        </header>
                        <div className={`goods-item-wrapper`}>
                          {Array.isArray(item2.children)
                            ? item2.children.map((item3, idx3) => {
                                return (
                                  <div
                                    className={`goods`}
                                    key={idx3}
                                    onClick={() => navigate('/goods-list')}
                                  >
                                    <img
                                      src={item3.cat_icon}
                                      alt={item3.cat_name}
                                    />
                                    <span>{item3.cat_name}</span>
                                  </div>
                                )
                              })
                            : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Tabbar ref={tabbarRef} />
    </div>
  )
}

export default Category
