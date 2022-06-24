import './index.scss'
import { forwardRef } from 'react'
const MyHeader = forwardRef((props, ref) => {
  const { title } = props
  return (
    <div className={`header`} ref={ref}>
      <span className="title">{title}</span>
    </div>
  )
})

export default MyHeader
