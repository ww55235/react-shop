import { reqGoodsSearch } from '@/api/index.js'

import { SearchBar } from 'antd-mobile'
import { useCallback, useState, useEffect } from 'react'
import MyHeader from '@/components/my-header/index.jsx'
import Goods from '@/components/goods/index.jsx'

function GoodsList(props) {
  const change = useCallback(event => {
    params.query = event.tab.value
  }, [])
  const [keyword, setKeyword] = useState('')
  const [params, setParams] = useState({
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  })

  const [total, setTotal] = useState(0)

  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await reqGoodsSearch()
      console.log(result, 'resultresultresult')
      setGoodsList(result.goods)
    })()
  }, [])

  return (
    <div className={`goodsList`}>
      <MyHeader title="商品列表" />
      <SearchBar
        value={params.query}
        placeholder="搜索"
        onChange={event => change(event)}
      />
      <Goods goodsList={goodsList}></Goods>
    </div>
  )
}

export default GoodsList
