import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <IoPersonOutline /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <IoLogInOutline /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <IoLogOutOutline /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
