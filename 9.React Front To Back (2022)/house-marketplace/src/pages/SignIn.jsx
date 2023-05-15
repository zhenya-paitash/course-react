import { useState } from "react"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth"

function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  // * ON ACTION
  const onChange = e => {
    setFormData(prevState =>  ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const onSubmit = async e => {
    e.preventDefault()

    try {
      const auth= getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (user) {
        navigate('/')
      }
    } catch (e) {
      toast.error('Bad User Credentials')
    }
  }

  // * RETURN
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            className="emailInput"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(prev => !prev)}
            />
          </div>

          <Link to='/forgot-password' className="forgotPasswordLink">
            Forgot Password?
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Login</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-up' className="registerLink">
          You need to Register?
        </Link>
      </div>
    </>
  )
}

export default SignIn
