import { useContext, useState, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

const RatingSelect = ({ select }) => {
  const [selected, setSelected] = useState(10)

  const { feedbackEdit } = useContext(FeedbackContext)

  useEffect(() => {
    setSelected(feedbackEdit.item.rating)
  }, [feedbackEdit])

  const handleChange = e => {
    const curValue = +e.currentTarget.value
    setSelected(curValue)
    select(curValue)
  }

  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, idx) => (
        <li key={`rating-${idx + 1}`}>
          <input
            type="radio"
            name="rating"
            id={`num${idx + 1}`}
            value={idx + 1}
            onChange={handleChange}
            checked={selected === idx + 1}
          />
          <label htmlFor={`num${idx + 1}`}>{idx + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect
