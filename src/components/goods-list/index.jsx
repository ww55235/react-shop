import { reqGoodsSearch } from '@/api/index.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { SearchBar, Tabs, ImageViewer } from 'antd-mobile'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import BScroll from 'better-scroll'
import qs from 'qs'
import MyHeader from '@/components/my-header/index.jsx'
import Goods from '@/components/goods/index.jsx'
import { NavBar } from 'antd-mobile'
function GoodsList(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const cat_id = searchParams.get('cat_id')

  //console.log(cat_id, 'cat_id')
  // console.log(location, 'location')
  const queryParams = qs.parse(location.search.slice(1))

  const [params, setParams] = useState({
    query: '',
    cid: queryParams.cat_id,
    pagenum: 1,
    pagesize: 10,
  })

  const [total, setTotal] = useState(0)

  const [goodsList, setGoodsList] = useState([])

  const [goodsScrollInstance, setGoodsScrollInstance] = useState(null)

  const [goodsScrollContainerHeight, setGoodsScrollContainerHeight] =
    useState(0)

  const reqSearchTimerRef = useRef(null)

  const searchBarRef = useRef(null)

  const navBarRef = useRef(null)

  const goodsScrollContainerRef = useRef(null)

  const reqSearch = async () => {
    const result = await reqGoodsSearch(params)
    setGoodsList(prevState => {
      if (!result.goods) {
        result.goods = []
      }
      return [...prevState, ...result.goods]
    })
  }

  useEffect(() => {
    // 减去 头部 和 搜索 tab 的高度
    let height = window.innerHeight - 45 - 45 - 35
    setGoodsScrollContainerHeight(height)
    setGoodsScrollInstance(() => {
      const instance = new BScroll(goodsScrollContainerRef.current, {
        probeType: 2,
        click: true,
        observeDOM: true,
        pullUpLoad: true,
        pullDownRefresh: true,
      })
      // console.log(instance, 'instanceinstanceinstanceinstance')

      //上拉刷新

      instance.on('pullingDown', () => {
        setParams(_ => ({
          query: '',
          cid: queryParams.cat_id,
          pagenum: 1,
          pagesize: 10,
        }))
        instance.finishPullDown()
      })

      // 下拉加载下一页
      instance.on('pullingUp', async () => {
        setParams(prevState => ({
          ...prevState,
          pagenum: ++prevState.pagenum,
        }))
        instance.finishPullUp()
      })
      return instance
    })
    reqSearch()
  }, [])

  // 参数变化重新请求数据
  useEffect(() => {
    clearTimeout(reqSearchTimerRef.current)
    reqSearchTimerRef.current = setTimeout(async () => {
      await reqSearch()
    }, 500)
    return () => {
      clearTimeout(reqSearchTimerRef.current)
    }
  }, [params])

  const back = useCallback(() => {
    navigate(-1)
  }, [])

  const change = useCallback(event => {
    // params.query = event.tab.value
    //  console.log(event, 'event')
    setParams(prevState => {
      return {
        ...prevState,
        query: event,
      }
    })
  }, [])

  useEffect(() => {
    console.log(searchBarRef.current, 'current')
    console.log(navBarRef.current, 'navBarRef')
  }, [])

  return (
    <div className={`goodsList`}>
      {/*<MyHeader title="商品列表" />*/}
      <NavBar onBack={() => back()}>商品列表</NavBar>
      <SearchBar
        value={params.query}
        ref={searchBarRef}
        placeholder="搜索"
        onChange={event => change(event)}
      />
      <Tabs>
        <Tabs.Tab title="综合" key="fruits"></Tabs.Tab>
        <Tabs.Tab title="销量" key="vegetables"></Tabs.Tab>
        <Tabs.Tab title="价格" key="animals"></Tabs.Tab>
      </Tabs>
      <div
        className={`goods-scroll-container`}
        ref={goodsScrollContainerRef}
        style={{
          height: goodsScrollContainerHeight + 'px',
          overflow: 'hidden',
        }}
      >
        <Goods goodsList={goodsList}></Goods>
      </div>
    </div>
  )
}

export default GoodsList
