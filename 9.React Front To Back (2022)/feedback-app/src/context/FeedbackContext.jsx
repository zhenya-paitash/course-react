// import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from 'react'
// import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback from db.json (json-server)
  const fetchFeedback = async () => {
    const res = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await res.json()
    
    setFeedback(data)
    setIsLoading(false)
  }
  
  // Add feedback
  const addFeedback = async newFeedback => {
    const res = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await res.json()
    console.log(data)

    // newFeedback.id = uuidv4()
    // newFeedback.id = uuidv4().replaceAll('-', '').toString(16)
    // setFeedback([newFeedback, ...feedback])
    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async id => {
    // if (!window.confirm('Are you sure?')) return
    await fetch(`/feedback/${id}`, { method: 'DELETE' })
    setFeedback(feedback.filter(i => i.id !== id))
    // setFeedback(prev => {
    //   return prev.filter(i => i.id !== id)
    // })
  }

  // Update feedback
  const updateFeedback = async (id, newItem) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    const data = await res.json()

    setFeedback(feedback.map(i => i.id === id ? { ...i, ...data } : i))
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Edit feedback
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider 
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >{ children }</FeedbackContext.Provider>
  )
}

export default FeedbackContext