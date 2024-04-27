import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Profile() {
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignout = () => {
    dispatch(signout())
    navigate('/')
    toast.success('Signed-out Successfully', {position: toast.POSITION.TOP_CENTER})
    toast.clearWaitingQueue()
  }

  return (
    <div className="profile-page-container">
      <div className="user-profile">
        <div>
          <h3>Profile</h3>
        </div>
        <div className="user-name-email-profile">
          <p>Username: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={handleSignout} className="signout-btn-profile">Sign-out</button>
      </div>
    </div>
  )
}

export default Profile