import './index.scss'
import { useNavigate } from 'react-router-dom'

function Goods(props) {
  const { goodsList } = props
  const navigate = useNavigate()
  return (
    <div className={`goods`}>
      {goodsList.map((goods, index) => {
        return (
          <div
            className={`goods-item`}
            key={index}
            onClick={() => navigate(`/goods-detail?goods_id=${goods.goods_id}`)}
          >
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
