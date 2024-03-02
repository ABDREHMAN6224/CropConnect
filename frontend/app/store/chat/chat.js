import {createSlice} from '@reduxjs/toolkit'

const serverUrl = 'http://localhost:3000'

export const getAllChats = createAsyncThunk('chat/getChat',
    async (_,thunkAPI) => {
        try {
            const response = await fetch(`${serverUrl}/chats/chats`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`
                }
            })
            return response.json()
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const createChat = createAsyncThunk('chat/createChat',async (data,thunkAPI) => {
    try {
        const response = await fetch(`${serverUrl}/chats/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${thunkAPI.getState().auth.token}`
            },
            body: JSON.stringify(data)
        })
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue({error: error.message})
    }
})

export const getUserChats = createAsyncThunk('chat/getUserChats',async (_,thunkAPI) => {
    try {
        const response = await fetch(`${serverUrl}/chats/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${thunkAPI.getState().auth.token}`
            }
        })
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue({error: error.message})
    }
})



const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
    }
})

export default chatSlice.reducer