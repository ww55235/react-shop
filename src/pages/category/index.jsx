import Tabbar from '@/components/tabbar/index.jsx'
import './index.scss'
import MyHeader from '@/components/my-header/index.jsx'
function Category(props) {
  return (
    <div className="category">
      <MyHeader title="分类" />
      <Tabbar />
    </div>
  )
}

export default Category
