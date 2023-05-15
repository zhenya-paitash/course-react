// import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {
  const { feedback, deleteFeedback, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedback || !feedback.length)) return <p>No Feedback Yet</p>

  return isLoading ? (<Spinner />) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} handleDelete={deleteFeedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// FeedbackList.propTypes = {
//   // feedback: PropTypes.array,
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired, 
//     })
//   ).isRequired,
// }


export default FeedbackList
