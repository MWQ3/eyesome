import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../../utils'

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
}

// sing-up a new user
export const signup = createAsyncThunk(('auth/signup'), async (user, thunkAPI) => {
    try {
        return await authService.signup(user)

    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// sing-in user
export const signin = createAsyncThunk(('auth/signin'), async (user, thunkAPI) => {
    try {
        return await authService.signin(user)
        
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const signout = createAction('auth/signout', () => {
    authService.signout()

    return {}
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        .addCase(signup.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(signin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        .addCase(signin.rejected, (state) => {
            state.isLoading = false
        })
    },
})


export default authSlice.reducer