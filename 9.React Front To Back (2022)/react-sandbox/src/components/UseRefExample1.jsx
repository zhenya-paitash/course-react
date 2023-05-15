import { useRef } from 'react'

function UseRefExample1() {
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault()
    console.log(inputRef.current.value)
  }

  return (
    <div className="container m-10">
      <form onSubmit={onSubmit}>
        <label htmlFor="name" className="text-secondary">Name:</label>
        <input
          type="text"
          id="name"
          ref={inputRef}
          className="form-control mb-2 rounded-lg px-5 py-2"
        />

        <button type="submit" className="btn btn-lg btn-secondary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default UseRefExample1
