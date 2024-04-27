import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../features/auth/authSlice';
import Loading from '../components/Loading'
import Logo from '../components/Logo';
import bannerHero from '../assets/bannerHero.jpg';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, user } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }) )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('Passwords don\'t Match!', {
                position: toast.POSITION.TOP_CENTER,
            })
            toast.clearWaitingQueue()
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(signup(userData))
            .unwrap()
            .then((user) => {
                toast.success(`New User Registered ${user.name}`)
                navigate('/')
            })
            .catch((errMsg) => toast.error(errMsg, {position: toast.POSITION.TOP_CENTER}))
            toast.clearWaitingQueue()
        }
        
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
                    <h2>Sign-up</h2>
                    <div className="form-group">
                    <input 
                    type='text' 
                    id='name' 
                    name='name'
                    className='form-control'
                    value={name}
                    onChange={handleChange}
                    placeholder='Enter your Username...'
                    required />

                    <input 
                    type='email' 
                    id='email' 
                    name='email'
                    className='form-control'
                    value={email}
                    onChange={handleChange}
                    placeholder='Enter your Email...'
                    required />
                    
                    <input 
                    type='password' 
                    id='password' 
                    name='password'
                    className='form-control'
                    value={password}
                    onChange={handleChange}
                    placeholder='Enter your Password...'
                    required />

                    <input 
                    type='password' 
                    id='password2' 
                    name='password2'
                    className='form-control'
                    value={password2}
                    onChange={handleChange}
                    placeholder='Confirm your Password...'
                    required />
                    </div>
                    
                    <div className="user-btn-container">
                        <button className="user-btn">Create Account</button>
                    </div> 
                </form>
                <span>Already Have an Account? <Link to='/signin'>
                    Sign-in
                </Link></span>
                
            </div>
        </div>
    </div>
  )
}

export default SignUp