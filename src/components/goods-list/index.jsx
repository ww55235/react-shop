import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchBar, Tabs, NavBar } from 'antd-mobile'

import { reqGoodsSearch } from '@/api/index.js'
import { TOP_HEIGHT, TAB_HEIGHT, INPUT_HEIGHT } from '@/constants'

import Goods from '@/components/goods'
import Scroll from '@/components/scroll'

const scrollHeight =
  window.innerHeight - (TOP_HEIGHT + TAB_HEIGHT + INPUT_HEIGHT)

function GoodsList(props) {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [goodsList, setGoodsList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const cat_id = searchParams.get('cat_id')
  const [params, setParams] = useState({
    query: '',
    cid: cat_id,
    pagenum: 1,
    pagesize: 10,
  })

  const onSearch = async () => {
    const { goods = [] } = await reqGoodsSearch(params)
    setGoodsList(goods)
  }

  useEffect(() => {
    onSearch()
  }, [])

  // 参数变化重新请求数据
  useEffect(() => {
    const timer = setTimeout(onSearch, 500)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [params])

  const back = useCallback(() => {
    navigate(-1)
  }, [])

  const inputChange = useCallback(value => {
    setParams(prevState => {
      return {
        ...prevState,
        query: value,
      }
    })
  }, [])

  // 上拉加载
  const fetchMoreData = async () => {
    console.log('上拉')
    // const result = await reqGoodsSearch({
    //   ...params,
    //   pagenum: params.pagenum + 1,
    // })
    // setGoodsList(prevState => {
    //   const goods = result.goods || []
    //   return [...prevState, ...goods]
    // })
    // setParams(prevState => ({
    //   ...prevState,
    //   pagenum: prevState.pagenum + 1,
    // }))
  }

  // 下拉刷新
  const refreshData = () => {
    console.log('下拉')
    // if (params.query === '') return
    // setParams({
    //   query: '',
    //   cid: cat_id,
    //   pagenum: 1,
    //   pagesize: 10,
    // })
  }

  return (
    <div className={`goodsList`}>
      {/*<MyHeader title="商品列表" />*/}
      <NavBar onBack={back}>商品列表</NavBar>
      <SearchBar
        value={params.query}
        placeholder="搜索"
        onChange={inputChange}
      />
      <Tabs>
        <Tabs.Tab title="综合" key="fruits"></Tabs.Tab>
        <Tabs.Tab title="销量" key="vegetables"></Tabs.Tab>
        <Tabs.Tab title="价格" key="animals"></Tabs.Tab>
      </Tabs>
      <Scroll
        ref={scrollRef}
        className={`goods-scroll-container`}
        style={{ height: scrollHeight }}
        pullUpLoad
        pullDownRefresh
        onPullUp={fetchMoreData}
        onPullDown={refreshData}
      >
        <Goods goodsList={goodsList}></Goods>
      </Scroll>
    </div>
  )
}

export default GoodsList
