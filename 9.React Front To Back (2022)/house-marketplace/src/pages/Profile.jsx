import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  let { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      const querySnap = await getDocs(q)

      let listings = []
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  // * ON ACTION
  const onLogout = e => {
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async e => {
    // e.preventDefault()

    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, { displayName: name })
        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { name })
      }
    } catch (e) {
      toast.error('Could not update profile details')
    }
  }
  const onChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }
  const onDelete = async listingId => {
    if (window.confirm('Are you sure want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      setListings(prev => prev.filter(l => l.id !== listingId))
      toast.success('Successfully deleted listing')
    }
  }
  const onEdit = listingId => navigate(`/edit-listing/${listingId}`)

  // * RETURN
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails(prevState => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={changeDetails ? 'profileNameActive' : 'profileName'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type='text'
              id='email'
              className={changeDetails ? 'profileEmailActive' : 'profileEmail'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>

        {loading ? (
          <></>
        ) : listings?.length ? (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map(listing => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </main>
    </div>
  )
}

export default Profile
