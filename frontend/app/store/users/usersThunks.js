import {createAsyncThunk} from '@reduxjs/toolkit';
import { BACKEND_URL } from '@/app/utils/constants';
import { isSucessfull } from '@/app/utils/general_utils';
import { setUsers } from './users';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, {rejectWithValue, getState, dispactch}) => {
        const response = await fetch(`${BACKEND_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().auth.token}`
            },
        });
        const data = await response.json();
        if (isSucessfull(response.status)) {
            dispactch(setUsers(data));
            return data;
        } else {
            return rejectWithValue(data);
        }      
    }
);