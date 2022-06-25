//首页接口
import request from '../request/index.js'

// 获取轮播图数据
export const reqSwiperdata = () => request('/home/swiperdata')

//获取导航数据

export const reqNavData = () => request('/home/catitems')

// 获取楼层数据
export const reqFloordata = () => request('/home/floordata')

// 分类页面接口

export const reqCategoryData = () => request('/categories')

// 商品搜索
export const reqGoodsSearch = data => request('/goods/search', data)

// 商品详情
export const reqGoodsDetail = goods_id =>
  request('/goods/detail', {
    goods_id,
  })
