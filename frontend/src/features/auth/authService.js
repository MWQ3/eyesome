import axios from 'axios'

const API_URL = '/api/users'

// sign up user
const signup = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// sign in user
const signin = async (userData) => {
    const response = await axios.post(`${API_URL}/signin`, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// sign out user
const signout = () => localStorage.removeItem('user')

const authService = {
    signup,
    signin,
    signout,
}

export default authService