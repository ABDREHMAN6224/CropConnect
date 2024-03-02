import { isSucessfull } from '@/app/utils/general_utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'auth/login',
    async (payload, {rejectWithValue, dispatch} ) => {
        const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (isSucessfull(response.status)) {
            dispatch(setToken(data.token));
        return data;
        } else {
        return rejectWithValue(data);
        }
    }
);