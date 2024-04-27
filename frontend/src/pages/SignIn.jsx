import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading'
import Logo from '../components/Logo';
import bannerHero from '../assets/bannerHero.jpg';


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, user } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }) )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userData = {
            email,
            password,
        }

        dispatch(signin(userData))
        .unwrap()
        .then((user) => {
            toast.success(`${user.name} Signed in`, {
                position: toast.POSITION.TOP_CENTER
            })
            navigate('/')
            toast.clearWaitingQueue()
        })
        .catch((errMsg) => {
            toast.error(errMsg, {position: toast.POSITION.TOP_CENTER})
            toast.clearWaitingQueue()
        })

        
    }

    if(isLoading) {
        return <Loading />
    }

    if(user) {
        return <Navigate to='/' replace />
    }

  return (
    <div className='user-container'>
        <div className='user-container-img'>
            <img src={bannerHero} alt="Two People Wearing Cool Glasses" />
        </div>
        <div className='userinfo-container'>
            <div className='user-info'>
                <Logo />
                <form className='user-form' onSubmit={handleSubmit}>
                    <h2>Sign-in</h2>
                    <div className="form-group">
                    <h3>Email</h3>
                    <input 
                    type='email' 
                    id='email' 
                    name='email'
                    className='form-control'
                    value={email}
                    onChange={handleChange}
                    placeholder='Enter your Email...'
                    required />

                    <h3>Password</h3>
                    <input 
                    type='password' 
                    id='password' 
                    name='password'
                    className='form-control'
                    value={password}
                    onChange={handleChange}
                    placeholder='Enter your Password...' 
                    required />
                    </div>
                    
                    <div className="user-btn-container">
                        <button className="user-btn">Sign-in</button>
                        <button className="guest-signin-btn">Sign-in as a Guest</button>
                    </div> 
                </form>
                <span>
                <Link to='/signup'>
                    Create New Account
                </Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default SignIn