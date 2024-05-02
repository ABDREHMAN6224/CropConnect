import { BACKEND_URL } from "/app/utils/constants";
import { isSucessfull } from "/app/utils/general_utils";
import { setToken } from "./auth";
import { setUser } from "../user/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../users/users";


export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    
    if (response.ok) {
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
      Promise.all([dispatch(getUsers())]);
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      body:payload,
    });
    const data = await response.json();
      dispatch(setToken(data?.token));
      dispatch(setUser(data?.user))
      return data;
  }
);
