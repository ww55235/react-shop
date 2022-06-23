import request from './ajax'

export default function (url = '', data = {}, method = 'get') {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await request({
        url,
        method,
        [method.toUpperCase() === 'get'.toUpperCase() ? 'params' : 'data']:
          data,
      })
      const code = res.data.meta.status
      switch (code) {
        case 200:
          resolve(res.data.message)
          break
        default:
          break
      }
    } catch (err) {
      return reject(err.data)
    }
  })
}
