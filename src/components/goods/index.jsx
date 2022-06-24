import './index.scss'

function Goods(props) {
  const { goodsList } = props
  return (
    <div className={`goods`}>
      {goodsList.map((goods, index) => {
        return (
          <div className={`goods-item`} key={index}>
            <div className="img-wrapper">
              <img src={goods.goods_small_logo} alt="" />
            </div>
            <div className="goods-info">
              <p className="goods-name">{goods.goods_name}</p>
              <p className="goods-price">¥ {goods.goods_price}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Goods
