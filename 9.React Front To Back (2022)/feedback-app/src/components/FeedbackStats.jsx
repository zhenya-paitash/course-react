// import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext)

  let average = feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length || 0
  average = average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      {/* <h4>Average Rating: {isNaN(average) ? 0 : average}</h4> */}
      <h4>Average Rating: {average}</h4>
    </div>
  )
}

// FeedbackStats.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   ).isRequired
// }

export default FeedbackStats
