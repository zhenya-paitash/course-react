import { useState, } from 'react'
import Todo from './Todo'

function UseRefExample3() {
  const [showTodo, setShowTodo] = useState(true)

  return (
    <div className="container m-10">
      <button
        className="btn btn-primary my-4"
        onClick={() => setShowTodo(!showTodo)}
      >Toggle Todo</button>

      {showTodo && <Todo />}
    </div>
  )
}

export default UseRefExample3