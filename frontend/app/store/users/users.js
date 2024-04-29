import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = "http://localhost:5000";


export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue, getState, dispactch }) => {
    const response = await fetch(`${BACKEND_URL}/auth/users?fields=name,email,avatar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log("error", data);
      return rejectWithValue(data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState:{
    users: [],
    filteredUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    updateFileteredUsers: (state, action) => {
      if(!action.payload){
        state.filteredUsers = [...state.users];
        return;
      }
      state.filteredUsers = state.users.filter((user) => user.name.toLowerCase().includes(action.payload.toLowerCase()));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state = [];
    }
    );

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.filteredUsers = action.payload.users;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state = [];
    });

  }
});

export default usersSlice.reducer;

export const { setUsers, updateFileteredUsers} = usersSlice.actions;
