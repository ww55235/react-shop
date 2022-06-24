import './index.scss'
function MyHeader(props) {
  const { title } = props
  return (
    <div className={`header`}>
      <span className="title">{title}</span>
    </div>
  )
}

export default MyHeader
