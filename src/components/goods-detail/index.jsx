import { useEffect, useState, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Swiper, ImageViewer, NavBar } from 'antd-mobile'
import qs from 'qs'
import { reqGoodsDetail } from '@/api/index'

import './index.scss'
import MyHeader from '../my-header/index.jsx'
function GoodsDetail(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const query = qs.parse(location.search.slice(1))

  const [goodsDetail, setGoodsDetail] = useState({})
  const [visible, setVisible] = useState(false)
  const [currentViewImgIndex, setCurrentViewImgIndex] = useState(0)
  // console.log(query, 'query...')
  // 获取商品详情页面数据
  useEffect(() => {
    ;(async () => {
      const result = await reqGoodsDetail(Number(query.goods_id))
      //  debugger
      setGoodsDetail(result)
    })()
  }, [])

  const previewPics = useMemo(
    () =>
      goodsDetail.pics &&
      Array.isArray(goodsDetail.pics) &&
      goodsDetail.pics.map(item => item.pics_sma_url),
    [goodsDetail]
  )

  const back = useCallback(() => {
    navigate(-1)
  }, [])

  const onIndexChange = index => {
    //console.log(index, 'index//////')
    setCurrentViewImgIndex(index)
  }

  const swiperItemClick = useCallback(() => {
    console.log(currentViewImgIndex, 'currentViewImgIndex')
    setVisible(true)
  }, [])
  return (
    <div className="goods-detail">
      {/*<MyHeader title="商品详情" />*/}
      <NavBar onBack={() => back()}>商品详情</NavBar>
      <div className="swiper-wrapper">
        <ImageViewer.Multi
          images={previewPics}
          visible={visible}
          defaultIndex={currentViewImgIndex}
          onClose={() => {
            setVisible(false)
          }}
        />
        <Swiper onIndexChange={onIndexChange}>
          {Array.isArray(goodsDetail.pics) &&
            goodsDetail.pics.map((pic, index) => {
              return (
                <Swiper.Item key={index} onClick={swiperItemClick}>
                  <img src={pic.pics_sma_url} alt="" />
                </Swiper.Item>
              )
            })}
        </Swiper>
      </div>

      <div className="goods-info">
        {/*商品描述,价格等*/}
        <div className={`goods-des`}>
          <p className={`goods-price`}>¥ {goodsDetail.goods_price}</p>
          <div className={`goods-name-wrapper`}>
            <span className={`name`}>{goodsDetail.goods_name}</span>
            <span className={`iconfont favorite icon-shoucang`}></span>
          </div>
        </div>
        {/*商品介绍*/}
        <div className={`goods-introduce`}>
          <p
            dangerouslySetInnerHTML={{ __html: goodsDetail.goods_introduce }}
          ></p>
        </div>
      </div>
    </div>
  )
}

export default GoodsDetail
