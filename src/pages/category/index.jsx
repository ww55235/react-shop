import Tabbar from '@/components/tabbar/index.jsx'
import './index.scss'
import MyHeader from '@/components/my-header/index.jsx'
import { reqCategoryData } from '@/api'
import { NavBar } from 'antd-mobile'
import { useEffect, useState, useRef, useCallback } from 'react'
import BScroll from 'better-scroll'
import { useLocation, useNavigate } from 'react-router-dom'

function Category(props) {
  const [categoryList, setCategoryList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contentBodyHeight, setContentBodyHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const [menuScrollInstance, setMenuScrollInstance] = useState(null)
  // 商品分类对应区块的高度
  //const [goodsCateClientHeights, setGoodsCateClientHeights] = useState([])
  //menu区域滚动 BS实例
  const scrollWrapperRef = useRef(null)
  // 头部组件Ref
  const headerRef = useRef(null)

  const tabbarRef = useRef(null)

  const [goodsCateClientHeights, setGoodsCateClientHeights] = useState([])

  const goodsWrapperScrollRef = useRef(null)

  const [goodsWrapperScrollInstance, setGoodsWrapperScrollInstance] =
    useState(null)

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
      // console.log(categoryList, 'categoryList ttt')
    })()
  }, [])

  // 初始化bs
  useEffect(() => {
    setGoodsWrapperScrollInstance(() => {
      const bsInstance = new BScroll(goodsWrapperScrollRef.current, {
        click: true,
        observeDOM: true,
        scrollY: true,
        probeType: 2,
      })
      bsInstance.on('scroll', pos => {
        setScrollY(-pos.y)
        // setScrollY(-pos.y)
        //  const scrollY = -pos.y
      })
      return bsInstance
    })
    const scroll = new BScroll(scrollWrapperRef.current, {
      click: true,
      observeDOM: true,
      scrollY: true,
      probeType: 2,
    })
    setMenuScrollInstance(scroll)
  }, [])

  // 获取区块的高度
  useEffect(() => {
    const clientHeights = []
    const children = document.querySelector('.goods-wrapper-scroll').children
    if (!children.length) {
      return
    }
    let height = 0
    clientHeights.push(height)
    ;[...children].forEach(child => {
      height += child.clientHeight
      clientHeights.push(height)
    })
    setGoodsCateClientHeights(clientHeights)
  }, [categoryList])

  // index 索引改变了滚动到对应的goods-wrapper
  useEffect(() => {
    //   console.log(goodsWrapperScrollInstance.current, 'curr')
    const element = document.querySelector('.goods-wrapper-scroll').children[
      currentIndex
    ]
    goodsWrapperScrollInstance?.scrollToElement(element, 300)
  }, [currentIndex])

  // 初始化
  useEffect(() => {
    const clientHeight = window.innerHeight
    const height = clientHeight - (tabbarRef.current.clientHeight + 45)
    setContentBodyHeight(height)
    goodsWrapperScrollRef.current.height = height + 'px'
  }, [categoryList])

  useEffect(() => {
    for (let i = 0; i < goodsCateClientHeights.length - 1; i++) {
      const prevHeight = goodsCateClientHeights[i]
      const nextHeight = goodsCateClientHeights[i + 1]
      if (scrollY >= prevHeight && scrollY <= nextHeight) {
        setCurrentIndex(i)
      }
    }
  }, [scrollY])

  return (
    <div className="category">
      {/*<MyHeader title="分类" ref={headerRef} />*/}
      <NavBar onBack={() => back()}>分类</NavBar>
      {/*{JSON.stringify(goodsCateClientHeights)}*/}
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
                                    onClick={() =>
                                      navigate(
                                        '/goods-list?' +
                                          'cat_id=' +
                                          item3.cat_id
                                      )
                                    }
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
