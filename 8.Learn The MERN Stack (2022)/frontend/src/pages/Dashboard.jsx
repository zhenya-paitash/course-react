import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getGoals } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    state => state.goals
  )

  useEffect(() => {
    if (!user) return navigate('/login')

    if (isError) {
      console.log(message)
      toast.error(message)
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.naem}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}
