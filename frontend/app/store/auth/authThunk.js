import { BACKEND_URL } from "/app/utils/constants";
import { isSucessfull } from "/app/utils/general_utils";
import { setToken } from "./auth";
import { setUser } from "../user/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    if (isSucessfull(response.status)) {
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (isSucessfull(response.status)) {
      dispatch(setToken(data?.token));
      dispatch(setUser(data?.user));
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
