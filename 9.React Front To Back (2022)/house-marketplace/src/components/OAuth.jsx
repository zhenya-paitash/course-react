import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  // * ON ACTION
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      const user = res.user
      // ? Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      // ? If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }

      toast.success('Welcome!')
      navigate('/')
    } catch (e) {
      toast.error('Could not authorize with Google')
    }
  }

  // * RENDER
  return (
    <div className="socialLogin">
      <p>
        Sign {location.pathname === '/sign-up' ? 'up' : 'in'}
      </p>

      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth
