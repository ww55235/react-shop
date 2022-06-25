/*
reduce只管纯函数，不管啥偶数加奇数加等等只是一个纯函数
* 本身就是一个函数*/ //之前的值，传过来的值
//prestate初始化状态是null所以得定义一下默认值
const initState = {
  cartList: [],
}
export default function countReduce(preState = initState, action) {
  const { type, data } = action
  const newState = JSON.parse(JSON.stringify(preState))
  switch (type) {
    default:
      return newState
  }
}
