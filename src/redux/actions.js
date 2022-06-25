/*
 * 专门为count组件生成action对象*/
export const increment = data => ({ type: 'add', data })
export const decrement = data => ({ type: 'inadd', data })
// 异步action就是指action的值为函数
export const incrementAsync = (data, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(data))
    }, time)
  }
}
