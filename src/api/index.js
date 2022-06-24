//首页
import request from '../request/index.js'

// 获取轮播图数据
export const reqSwiperdata = () => request('/home/swiperdata')

//获取导航数据

export const reqNavData = () => request('/home/catitems')

// 获取楼层数据
export const reqFloordata = () => request('/home/floordata')
