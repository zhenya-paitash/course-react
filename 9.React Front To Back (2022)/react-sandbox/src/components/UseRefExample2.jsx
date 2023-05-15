import { useState, useEffect, useRef } from 'react'

function UseRefExample2() {
  const [name, setName] = useState('')
  const renders = useRef(1)
  const prevName = useRef('')

  useEffect(() => {
    renders.current = renders.current + 1
    prevName.current = name
  }, [name])

  // const onSubmit = e => {
  //   e.preventDefault()
  //   console.log(inputRef.current.value)
  // }

  return (
    <div className="container m-10">
      <h1>Renders: {renders.current}</h1>
      <h2>Prev name state: {prevName.current}</h2>

      <input type="text" className="form-control rounded-sm px-4 py-2 mb-3" value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

export default UseRefExample2