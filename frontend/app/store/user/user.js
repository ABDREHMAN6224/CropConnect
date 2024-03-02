import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  role: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(state);
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
