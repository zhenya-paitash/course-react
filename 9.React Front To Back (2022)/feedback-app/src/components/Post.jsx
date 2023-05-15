import { Navigate, useNavigate } from "react-router-dom"

const Post = () => {
  const navigate = useNavigate()

  const status = 200  
  if (status === 404) return <Navigate to='/notfound' />

  const navigateHandler = e => {
    e.preventDefault()
    navigate('/about')
  }

  return (
    <div>
      <h1>Post</h1>
      <button className="btn btn-secondary" onClick={navigateHandler}>Back</button>
    </div>
  )
}

export default Post
