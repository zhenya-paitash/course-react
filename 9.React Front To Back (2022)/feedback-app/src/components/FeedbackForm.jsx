import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from './shared/Button'
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    const { edit, item } = feedbackEdit
    if (edit) {
      setBtnDisabled(false)
      setText(item.text)
      setRating(item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = e => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }

    setText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (text.trim().length < 11) return

    const newFeedback = { text, rating }

    if (feedbackEdit.edit) {
      updateFeedback(feedbackEdit.item.id, newFeedback)
    } else {
      addFeedback(newFeedback)
    }

    setText('')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={rating => setRating(rating)} />
        <div className="input-group">
          <input type="text" value={text} onChange={handleTextChange} placeholder="Write a review" />
          <Button type="submit" disabled={btnDisabled}>
            {feedbackEdit.edit ? 'Update' : 'Create'}
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
