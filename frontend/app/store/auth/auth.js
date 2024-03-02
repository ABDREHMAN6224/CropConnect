// authSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
            state.token = ''
            localStorage.removeItem('token')
        },
        setToken: (state, action) => {
            // Set token in localStorage
            localStorage.setItem('token', action.payload)
            // Set token in cookies
            document.cookie = `token=${action.payload}; path=/`
            state.token = action.payload
        },
    }
})

export default authSlice.reducer

export const { logout, setToken, setIsLoading } = authSlice.actions