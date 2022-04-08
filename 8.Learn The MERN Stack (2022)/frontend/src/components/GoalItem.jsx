import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

export default function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleDateString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        ❌
      </button>
    </div>
  )
}
